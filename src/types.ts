export type AminoAcid =
  | "Ala."
  | "Arg."
  | "Asn."
  | "Asp."
  | "Cys."
  | "Gln."
  | "Glu."
  | "Gly."
  | "His."
  | "Ile."
  | "Leu."
  | "Lys."
  | "Met."
  | "Phe."
  | "Pro."
  | "Ser."
  | "Thr."
  | "Trp."
  | "Tyr."
  | "Val.";

interface Codon<T> {
  aminoAcid: T | null;
  isInitiation?: boolean;
  isTermination?: boolean;
}
interface InitiationCodon<T> extends Codon<T> {
  aminoAcid: T;
  isInitiation: true;
}
interface TerminationCodon extends Codon<any> {
  aminoAcid: null;
  isTermination: true;
}

export type CodonTable<T> = {
  [Codon: string]: Codon<T>;
};

export const isInitiationCodon = <T = AminoAcid>(
  codon: any
): codon is InitiationCodon<T> => codon && codon.isInitiation;
export const isTerminationCodon = (codon: any): codon is TerminationCodon =>
  codon && codon.isTermination;
