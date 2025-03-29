export interface BaseData {
  state: string;
  year: number;
  value: number;
}

export interface CategoryData extends BaseData {
  category: string;
}

export interface RegionalMinorityStateWiseParticipationData extends BaseData {
  seatType: string;
}

export interface ClauseAndCategoryWiseCandidatesData extends BaseData {
  clause: string;
}

export interface LinguisticWiseMinorityCandidatesData extends BaseData {
  lingual: string;
}

export interface CandidatesParticipatedCounsellingData extends BaseData {
  status: "Registered" | "Qualified" | "Participated";
}

export interface ReligionClaimData extends BaseData {
  religion: string;
}

export type MeritListTooltip = {
  year: string;
  value: number;
  column: string;
  diff?: {
    difference: number;
    percentage: number;
    currentYear: string;
    prevYear: string;
  };
};

export interface EligibilityByRankAndMarksRangeData extends BaseData {
  labels: string;
  label2: string;
}

export type DataPoint = {
  category: string;
  value: number;
};
