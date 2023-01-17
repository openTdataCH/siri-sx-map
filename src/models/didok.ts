export interface DiDokRecord {
  SLOID: string;
  N_WGS84: string;
  E_WGS84: string;
}

export interface DiDokResult {
  records: DiDokRecord[];
}

export interface DiDokResponse {
  result: DiDokResult;
}
