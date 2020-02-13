import { Transform } from "stream";
import {
  CodonTable,
  isInitiationCodon,
  isTerminationCodon,
  AminoAcid
} from "./types";

type Options = {
  codonTable?: CodonTable<any>;
  intron?: string;
  initiation?: string;
  termination?: string;
};

const defaultCodonTable: CodonTable<AminoAcid> = {
  UUU: { aminoAcid: "Phe." },
  UUC: { aminoAcid: "Phe." },
  UUA: { aminoAcid: "Leu." },
  UUG: { aminoAcid: "Leu." },
  UCU: { aminoAcid: "Ser." },
  UCC: { aminoAcid: "Ser." },
  UCA: { aminoAcid: "Ser." },
  UCG: { aminoAcid: "Ser." },
  UAU: { aminoAcid: "Tyr." },
  UAC: { aminoAcid: "Tyr." },
  UAA: { aminoAcid: null, isTermination: true },
  UAG: { aminoAcid: null, isTermination: true },
  UGU: { aminoAcid: "Cys." },
  UGC: { aminoAcid: "Cys." },
  UGA: { aminoAcid: null, isTermination: true },
  UGG: { aminoAcid: "Trp." },
  CUU: { aminoAcid: "Leu." },
  CUC: { aminoAcid: "Leu." },
  CUA: { aminoAcid: "Leu." },
  CUG: { aminoAcid: "Leu." },
  CCU: { aminoAcid: "Pro." },
  CCC: { aminoAcid: "Pro." },
  CCA: { aminoAcid: "Pro." },
  CCG: { aminoAcid: "Pro." },
  CAU: { aminoAcid: "His." },
  CAC: { aminoAcid: "His." },
  CAA: { aminoAcid: "Gln." },
  CAG: { aminoAcid: "Gln." },
  CGU: { aminoAcid: "Arg." },
  CGC: { aminoAcid: "Arg." },
  CGA: { aminoAcid: "Arg." },
  CGG: { aminoAcid: "Arg." },
  AUU: { aminoAcid: "Ile." },
  AUC: { aminoAcid: "Ile." },
  AUA: { aminoAcid: "Ile.", isInitiation: true },
  AUG: { aminoAcid: "Met.", isInitiation: true },
  ACU: { aminoAcid: "Thr." },
  ACC: { aminoAcid: "Thr." },
  ACA: { aminoAcid: "Thr." },
  ACG: { aminoAcid: "Thr." },
  AAU: { aminoAcid: "Asn." },
  AAC: { aminoAcid: "Asn." },
  AAA: { aminoAcid: "Lys." },
  AAG: { aminoAcid: "Lys." },
  AGU: { aminoAcid: "Ser." },
  AGC: { aminoAcid: "Ser." },
  AGA: { aminoAcid: "Arg." },
  AGG: { aminoAcid: "Arg." },
  GUU: { aminoAcid: "Val." },
  GUC: { aminoAcid: "Val." },
  GUA: { aminoAcid: "Val." },
  GUG: { aminoAcid: "Val.", isInitiation: true },
  GCU: { aminoAcid: "Ala." },
  GCC: { aminoAcid: "Ala." },
  GCA: { aminoAcid: "Ala." },
  GCG: { aminoAcid: "Ala." },
  GAU: { aminoAcid: "Asp." },
  GAC: { aminoAcid: "Asp." },
  GAA: { aminoAcid: "Glu." },
  GAG: { aminoAcid: "Glu." },
  GGU: { aminoAcid: "Gly." },
  GGC: { aminoAcid: "Gly." },
  GGA: { aminoAcid: "Gly." },
  GGG: { aminoAcid: "Gly." }
};

export default class RibosomeStream<T = AminoAcid> extends Transform {
  private orphans = "";
  private sequence = "";

  private codonTable: CodonTable<T>;
  private intron: string;
  private initiation?: string;
  private termination?: string;

  constructor(options: Options = {}) {
    super();
    this.codonTable = options.codonTable || defaultCodonTable;
    this.intron = options.intron || "   ";
    this.initiation = options.initiation;
    this.termination = options.termination;

    if (
      !Object.keys(this.codonTable).every(triplet =>
        triplet.match(/^[AUGCaugc]{3}$/g)
      )
    ) {
      throw new Error(
        "Invalid codon table provided to constructor. All the keys should be constructed with 3 valid base abbriviations i.e. A, U, G and C."
      );
    }
  }

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

    this.sequence = this.orphans + basestring;

    while (this.sequence.length > 2) {
      this.waitInitiation();
      this.waitTermination();
    }

    this.orphans = this.sequence;
    callback();
  }

  _flush(callback: () => void) {
    this.orphans = "";
    this.sequence = "";
    callback();
  }

  private readTriplet = (num = 3) => {
    const triplet = this.sequence.slice(0, 3);
    this.sequence = this.sequence.slice(num);
    const codon = this.codonTable[triplet];
    return codon;
  };

  private waitInitiation = () => {
    let found = false;
    while (!found && this.sequence.length > 2) {
      const codon = this.readTriplet(1);
      if (isInitiationCodon(codon)) {
        found = true;
        this.initiation && this.push(this.initiation);
        this.push(codon.aminoAcid);
      } else {
        this.push(this.intron);
      }
    }
  };

  private waitTermination = () => {
    let found = false;
    while (!found && this.sequence.length > 2) {
      const codon = this.readTriplet();
      if (isTerminationCodon(codon)) {
        found = true;
        this.termination && this.push(this.termination);
      } else {
        this.push(codon.aminoAcid);
      }
    }
  };
}
