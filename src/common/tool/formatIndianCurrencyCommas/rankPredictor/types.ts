export type PredictorInput = "rank" | "score";

export type ButtonVariant = "primary" | "loading" | "disabled";

export type RankPredictorValue = {
  min: number;
  max: number;
};

export type RankPredictorData = {
  year: number;
  value: RankPredictorValue | number;
};

export type RankPredictorGraphData = {
  year: number;
  value: number;
  secondaryValue: number | null;
  fill: string;
  predictedFill: string;
  tool: PredictorInput;
  scoreAttribute: "min" | "max";
};

export type RankPredictorGraphInputData = {
  data: RankPredictorGraphData[][];
  valueMinMax: {
    min: number;
    max: number;
  };
  years: string[];
};

export type RankPredictorGraphColors = {
  max: string;
  min: string;
};

export type RankPredictorRankTooltip = {
  min: {
    value: number | null;
    difference?: number | undefined;
    percentage?: number | undefined;
  };
  max: {
    value: number | null;
    difference?: number | undefined;
    percentage?: number | undefined;
  };
  year: number;
};

export interface RankData {
  score: string;
  min_rank: string;
  max_rank: string;
  year: string;
}

export interface ScorePredictorData {
  value: number;
  year: number;
}
