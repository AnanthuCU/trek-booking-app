import {
  candidatesParticipatedCounsellingData,
  categoryWiseCandidatesAppliedData,
  clauseAndCategoryWiseCandidatesData,
  eligibilityByRankAndMarksRangeData,
  linguisticWiseMinorityCandidatesData,
  regionalMinorityStateWiseParticipationData,
  religionClaimData,
  specialCategoryCandidateParticipationData,
  stateWiseCategoryParticipationData,
} from "./data";
import { CategoryData } from "./types";

export const getElementsWithInterval = (arr: any[], n: number): number[] => {
  if (arr.length === 1 || n === 1) {
    return arr;
  }

  if (n === 2) {
    return [arr[0], arr[arr.length - 1]];
  }

  const interval = Math.floor((arr.length - 2) / (n - 2));
  const result = [arr[0]];

  for (let i = interval; i < arr.length - 1; i += interval) {
    result.push(arr[i]);
  }

  result.push(arr[arr.length - 1]);
  return result;
};

export const generateRangeArray = (
  start: number,
  end: number,
  n: number
): number[] => {
  const result = [];
  const step = Math.round((end - start) / (n - 1));

  for (let i = 0; i < n; i++) {
    result.push(start + i * step);
  }

  // Ensure the last value is exactly the `end` value
  result[result.length - 1] = end;

  return result;
};

export const joinTwoArrays = (linear: number[], log: number[]) => {
  return linear.map((_: number, index: number) => {
    return {
      linear: linear[index],
      log: log[index],
    };
  });
};

export const convertKeyValueObject = (data: CategoryData[]) => {
  const obj: any = {};

  data.forEach((record) => {
    obj[record.category] = record.value;
  });
  return obj;
};

export const cordForAngle = (angle: number, len: number) => {
  let x = Math.cos(angle) * len;
  let y = Math.sin(angle) * len;

  return { x: x, y: y };
};

export const prepareCordData = (data: CategoryData[]) => {
  return data.map((record, index) => {
    return { ...record, index };
  });
};

export const hexToRgba = (hex: string, alpha: number): string => {
  hex = hex.replace("#", "");

  if (hex.length !== 6) {
    throw new Error("Invalid hex code");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getStatesFromMeritListData = () => {
  const statesSet = new Set<string>();

  candidatesParticipatedCounsellingData.forEach((record) => {
    statesSet.add(record.state);
  });

  eligibilityByRankAndMarksRangeData.forEach((record) => {
    statesSet.add(record.state);
  });

  clauseAndCategoryWiseCandidatesData.forEach((record) => {
    statesSet.add(record.state);
  });

  stateWiseCategoryParticipationData.forEach((record) => {
    statesSet.add(record.state);
  });

  linguisticWiseMinorityCandidatesData.forEach((record) => {
    statesSet.add(record.state);
  });

  specialCategoryCandidateParticipationData.forEach((record) => {
    statesSet.add(record.state);
  });

  regionalMinorityStateWiseParticipationData.forEach((record) => {
    statesSet.add(record.state);
  });

  categoryWiseCandidatesAppliedData.forEach((record) => {
    statesSet.add(record.state);
  });

  religionClaimData.forEach((record) => {
    statesSet.add(record.state);
  });

  return Array.from(statesSet);
};
