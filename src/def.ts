export type AminoAcid =
  | "Ala"
  | "Arg"
  | "Asn"
  | "Asp"
  | "Cys"
  | "Gln"
  | "Glu"
  | "Gly"
  | "His"
  | "Ile"
  | "Leu"
  | "Lys"
  | "Met"
  | "Phe"
  | "Pro"
  | "Ser"
  | "Thr"
  | "Trp"
  | "Tyr"
  | "Val";

type Codon = {
  aminoAcid: AminoAcid;
};
type InitiationCodon = {
  aminoAcid: AminoAcid;
  isInitiation: true;
};
type TerminationCodon = {
  aminoAcid: null;
  isTermination: true;
};

export const isCodon = (codon: any): codon is Codon => codon && codon.aminoAcid;
export const isInitiationCodon = (codon: any): codon is InitiationCodon =>
  codon && codon.isInitiation;
export const isTerminationCodon = (codon: any): codon is TerminationCodon =>
  codon && codon.isTermination;

export const codonTable: {
  [Codon: string]: InitiationCodon | TerminationCodon | Codon;
} = {
  UUU: { aminoAcid: "Phe" },
  UUC: { aminoAcid: "Phe" },
  UUA: { aminoAcid: "Leu" },
  UUG: { aminoAcid: "Leu" },
  UCU: { aminoAcid: "Ser" },
  UCC: { aminoAcid: "Ser" },
  UCA: { aminoAcid: "Ser" },
  UCG: { aminoAcid: "Ser" },
  UAU: { aminoAcid: "Tyr" },
  UAC: { aminoAcid: "Tyr" },
  UAA: { aminoAcid: null, isTermination: true },
  UAG: { aminoAcid: null, isTermination: true },
  UGU: { aminoAcid: "Cys" },
  UGC: { aminoAcid: "Cys" },
  UGA: { aminoAcid: null, isTermination: true },
  UGG: { aminoAcid: "Trp" },
  CUU: { aminoAcid: "Leu" },
  CUC: { aminoAcid: "Leu" },
  CUA: { aminoAcid: "Leu" },
  CUG: { aminoAcid: "Leu" },
  CCU: { aminoAcid: "Pro" },
  CCC: { aminoAcid: "Pro" },
  CCA: { aminoAcid: "Pro" },
  CCG: { aminoAcid: "Pro" },
  CAU: { aminoAcid: "His" },
  CAC: { aminoAcid: "His" },
  CAA: { aminoAcid: "Gln" },
  CAG: { aminoAcid: "Gln" },
  CGU: { aminoAcid: "Arg" },
  CGC: { aminoAcid: "Arg" },
  CGA: { aminoAcid: "Arg" },
  CGG: { aminoAcid: "Arg" },
  AUU: { aminoAcid: "Ile" },
  AUC: { aminoAcid: "Ile" },
  AUA: { aminoAcid: "Ile", isInitiation: true },
  AUG: { aminoAcid: "Met", isInitiation: true },
  ACU: { aminoAcid: "Thr" },
  ACC: { aminoAcid: "Thr" },
  ACA: { aminoAcid: "Thr" },
  ACG: { aminoAcid: "Thr" },
  AAU: { aminoAcid: "Asn" },
  AAC: { aminoAcid: "Asn" },
  AAA: { aminoAcid: "Lys" },
  AAG: { aminoAcid: "Lys" },
  AGU: { aminoAcid: "Ser" },
  AGC: { aminoAcid: "Ser" },
  AGA: { aminoAcid: "Arg" },
  AGG: { aminoAcid: "Arg" },
  GUU: { aminoAcid: "Val" },
  GUC: { aminoAcid: "Val" },
  GUA: { aminoAcid: "Val" },
  GUG: { aminoAcid: "Val", isInitiation: true },
  GCU: { aminoAcid: "Ala" },
  GCC: { aminoAcid: "Ala" },
  GCA: { aminoAcid: "Ala" },
  GCG: { aminoAcid: "Ala" },
  GAU: { aminoAcid: "Asp" },
  GAC: { aminoAcid: "Asp" },
  GAA: { aminoAcid: "Glu" },
  GAG: { aminoAcid: "Glu" },
  GGU: { aminoAcid: "Gly" },
  GGC: { aminoAcid: "Gly" },
  GGA: { aminoAcid: "Gly" },
  GGG: { aminoAcid: "Gly" }
};
