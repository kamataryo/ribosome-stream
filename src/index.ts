import { Transform } from "stream";
import { codonTable, isInitiationCodon, isTerminationCodon } from "./def";

export default class RibosomeStream extends Transform {
  _orphans = "";
  _sequence = "";

  _transform(chunk: string, _1: any, callback: () => void) {
    const basestring = chunk
      .toString()
      .toUpperCase()
      .trim();
    if (
      !basestring
        .split("")
        .every(
          base => base === "A" || base === "U" || base === "G" || base === "C"
        )
    ) {
      throw new Error("Invalid base sequence input");
    }

    this._sequence = this._orphans + basestring;

    while (this._sequence.length > 2) {
      this.waitInitiation();
      this.waitTermination();
    }

    this._orphans = this._sequence;
    callback();
  }

  _flush(callback: () => void) {
    this._orphans = "";
    callback();
  }

  _readTriplet = (num = 3) => {
    const triplet = this._sequence.slice(0, 3);
    this._sequence = this._sequence.slice(num);
    const codon = codonTable[triplet];
    return codon;
  };

  waitInitiation = () => {
    let found = false;
    while (!found && this._sequence.length > 2) {
      const codon = this._readTriplet(1);
      if (isInitiationCodon(codon)) {
        found = true;
        this.push(`${codon.aminoAcid}.`);
      } else {
        this.push(" ");
      }
    }
  };

  waitTermination = () => {
    let found = false;
    while (!found && this._sequence.length > 2) {
      const codon = this._readTriplet();
      if (isTerminationCodon(codon)) {
        found = true;
      } else {
        this.push(`${codon.aminoAcid}.`);
      }
    }
  };
}
