export interface ScoutObject {
  objectName: string;
  H: string;
  nObs: number;
  caDist: string | null;
  neoScore: number;
  phaScore: number;
  ieoScore: number;
  neo1kmScore: number;
  geocentricScore: number;
  tisserandScore: number;
  rating: number;
  Vmag: string;
  arc: string;
  lastRun: string;
  moid: string;
  rate: string;
  elong: string;
  rmsN: string;
  unc: string;
  ra: string;
  dec: string;
  tEphem: string;
  vInf: string | null;
  uncP1: string;
}

export interface ScoutResponse {
  signature: { source: string; version: string };
  data: ScoutObject[];
}
