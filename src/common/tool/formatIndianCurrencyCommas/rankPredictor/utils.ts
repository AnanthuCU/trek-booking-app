// import {
//   calculateDifferenceAndPercentage,
//   formatCurrency,
// } from "@/app/five-year-competition/utils";
import {
  PredictorInput,
  RankData,
  RankPredictorData,
  RankPredictorGraphColors,
  RankPredictorGraphData,
  RankPredictorGraphInputData,
  ScorePredictorData,
} from "./types";
import { rank_data } from "./data";

export const isRankValid = (inp: number | null) => {
  if (!inp) return false;
  return inp >= 1 && inp <= 720;
};

export const isScoreValid = (inp: number | null) => {
  if (!inp) return false;
  return inp > 0;
};

export const sampleRankData: RankPredictorData[] = [
  {
    value: {
      min: 2300,
      max: 2460,
    },
    year: 2022,
  },
  {
    value: { min: 2570, max: 2600 },
    year: 2023,
  },
  {
    value: { min: 2620, max: 2700 },
    year: 2024,
  },
  {
    value: { min: 2820, max: 2930 },
    year: 2025,
  },
];

export const sampleScoreData: RankPredictorData[] = [
  {
    value: 230,
    year: 2022,
  },
  {
    value: 257,
    year: 2023,
  },
  {
    value: 262,
    year: 2024,
  },
  {
    value: 282,
    year: 2025,
  },
];

const colors: RankPredictorGraphColors = {
  max: "#F38A01",
  min: "#FFBF33",
};

const predictedFillColors: RankPredictorGraphColors = {
  min: "#38F06F",
  max: "#05B43A",
};

export const prepareRankPredictorData = (
  data: RankPredictorData[] | null,
  tool: PredictorInput
): RankPredictorGraphInputData => {
  let minTemp: RankPredictorGraphData[] = [];
  let maxTemp: RankPredictorGraphData[] = [];

  // min max
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  const yearSet = new Set<string>();

  if (!data)
    return {
      data: [
        [
          {
            year: 0,
            value: 0,
            secondaryValue: null,
            fill: "#fff",
            predictedFill: "#fff",
            tool: "rank",
            scoreAttribute: "min",
          },
        ],
      ],
      valueMinMax: {
        min: 0,
        max: 0,
      },
      years: ["2021"],
    };

  data.forEach((record) => {
    if (typeof record.value === "number") {
      yearSet.add(`${record.year}`);
      if (record.value > max) {
        max = record.value;
      }
      if (record.value < min) {
        min = record.value;
      }
      maxTemp.push({
        year: record.year,
        value: record.value,
        secondaryValue: null,
        fill: colors.max,
        predictedFill: predictedFillColors.max,
        tool,
        scoreAttribute: "max",
      });
    } else {
      yearSet.add(`${record.year}`);
      if (record.value.max > max) {
        max = record.value.max;
      }
      if (record.value.max < min) {
        min = record.value.max;
      }
      if (record.value.min > max) {
        max = record.value.min;
      }
      if (record.value.min < min) {
        min = record.value.min;
      }
      maxTemp.push({
        year: record.year,
        value: record.value.max,
        secondaryValue: record.value.min,
        fill: colors.max,
        predictedFill: predictedFillColors.max,
        tool,
        scoreAttribute: "max",
      });
      minTemp.push({
        year: record.year,
        value: record.value.min,
        secondaryValue: record.value.max,
        fill: colors.min,
        predictedFill: predictedFillColors.min,
        tool,
        scoreAttribute: "min",
      });
    }
  });

  const res = {
    data: typeof data[0].value === "number" ? [maxTemp] : [minTemp, maxTemp],
    valueMinMax: {
      min: Math.round(min - min * 0.05),
      max: Math.round(max + max * 0.05),
    },
    years: Array.from(yearSet),
  };

  return res;
};

export const prepareRankPredictorLabelData = (data: RankPredictorGraphData) => {
  let prefix = "";

  if (data.tool === "rank") {
    prefix = data.scoreAttribute === "max" ? "Max " : "Min ";
  } else {
    prefix = "Score ";
  }

  return {
    prefix,
    value: formatIndianCurrencyCommas(data.value),
  };
};

export const findInRankPredictorData = (
  masterData: RankPredictorGraphData[][],
  targetRecord: RankPredictorGraphData
) => {
  const matchedRecords: RankPredictorGraphData[] = [];

  masterData.forEach((lineRecord) => {
    lineRecord.map((record) => {
      if (record.year === targetRecord.year - 1) {
        matchedRecords.push(record);
      }
    });
  });

  return matchedRecords;
};

export const getPrevMinMaxRankPercentage = (
  data: RankPredictorGraphData[],
  currentRecord: RankPredictorGraphData
) => {
  const currentMin =
    currentRecord.scoreAttribute === "min"
      ? currentRecord.value
      : currentRecord.secondaryValue;
  const currentMax =
    currentRecord.scoreAttribute === "max"
      ? currentRecord.value
      : currentRecord.secondaryValue;
  let targetMin =
    data[0].scoreAttribute === "min" ? data[0].value : data[0].secondaryValue;
  let targetMax =
    data[0].scoreAttribute === "max" ? data[0].value : data[0].secondaryValue;

  let minDiffAndPercentage;
  let maxDiffAndPercentage;
  // if (currentMax && currentMin && targetMax && targetMin) {
  //   minDiffAndPercentage = calculateDifferenceAndPercentage(
  //     currentMin,
  //     targetMin
  //   );
  //   maxDiffAndPercentage =
  //    calculateDifferenceAndPercentage(
  //     currentMax,
  //     targetMax
  //   );
  // }

  // return {
  //   min: { ...minDiffAndPercentage, value: currentMin },
  //   max: { ...maxDiffAndPercentage, value: currentMax },
  // };
};

export const sliceArrayOfArrays = (
  data: RankPredictorGraphData[][],
  startIndex: number = 0,
  endIndex: number = data.length
) => {
  const res: RankPredictorGraphData[][] = [];

  data.forEach((lineRecord) => {
    res.push(lineRecord.slice(startIndex, endIndex));
  });

  return res;
};

export const formatCurrencyWithoutSymbol = (value: number | string) => {
  let intValue = typeof value === "string" ? parseInt(value) : value;

  if (isNaN(intValue)) return `0`;
  if (intValue < 0) return "0";
  if (intValue < 999) {
    return `${intValue}`;
  }
  if (intValue >= 1000 && intValue <= 99999) {
    let newValue = intValue / 1000;
    return newValue % 1 === 0 ? `${newValue} K` : `${newValue.toFixed(1)} K`;
  } else if (intValue < 9999999 && intValue >= 100000) {
    let newValue = intValue / 100000;
    return newValue % 1 === 0 ? `${newValue} L` : `${newValue.toFixed(1)} L`;
  } else if (intValue >= 10000000) {
    let newValue = intValue / 10000000;
    return newValue % 1 === 0 ? `${newValue} Cr` : `${newValue.toFixed(1)} Cr`;
  } else {
    return `0`;
  }
};

// export const formatIndianCurrencyCommas = (number: number) => {
//   let str = "";
//   if (number <= 999) {
//     return `${number}`;
//   } else {
//     const suffix = number % 1000;
//     let remainder = Math.trunc(number / 1000);

//     str += `,${suffix}`.split("").reverse().join("");
//     while (remainder > 100) {
//       const digits = Math.trunc(remainder % 100);
//       str += `,${digits}`.split("").reverse().join("");
//       remainder = Math.trunc(remainder / 100);
//     }
//     const resultValue = str + `${remainder}`;
//     return resultValue.split("").reverse().join("");
//   }
// };

export const formatIndianCurrencyCommas = (number: number) => {
  if (!number) return "";
  return number.toLocaleString("en-IN");
};

function findClosestMatch(score: number, yearData: RankData[]): RankData {
  let closestMatch = yearData[0];
  let minDiff = Math.abs(score - parseInt(closestMatch.score));

  for (const data of yearData) {
    const currentDiff = Math.abs(score - parseInt(data.score));
    if (currentDiff < minDiff) {
      minDiff = currentDiff;
      closestMatch = data;
    }
  }

  return closestMatch;
}

export function getRankPredictorData(score: number): RankPredictorData[] {
  const years = ["2022", "2023", "2024", "2025"];
  const result: RankPredictorData[] = [];

  for (const year of years) {
    const yearData = rank_data.filter((data) => data.year === year);
    if (yearData.length > 0) {
      const closestMatch = findClosestMatch(score, yearData);
      result.push({
        value: {
          min: parseInt(closestMatch.min_rank),
          max: parseInt(closestMatch.max_rank),
        },
        year: parseInt(year),
      });
    } else {
      result.push({
        value: { min: 0, max: 0 },
        year: parseInt(year),
      });
    }
  }

  return result;
}

function calculateDistance(rank: number, min: number, max: number): number {
  if (rank >= min && rank <= max) return 0;
  return rank < min ? min - rank : rank - max;
}

function findClosestScoreEntry(rank: number, yearData: RankData[]): RankData {
  let closestEntry = yearData[0];
  let minDistance = calculateDistance(
    rank,
    parseInt(closestEntry.min_rank),
    parseInt(closestEntry.max_rank)
  );

  for (const entry of yearData) {
    const currentMin = parseInt(entry.min_rank);
    const currentMax = parseInt(entry.max_rank);
    const currentDistance = calculateDistance(rank, currentMin, currentMax);

    if (
      currentDistance < minDistance ||
      (currentDistance === minDistance &&
        parseInt(entry.score) > parseInt(closestEntry.score))
    ) {
      minDistance = currentDistance;
      closestEntry = entry;
    }
  }

  return closestEntry;
}

// export function getScorePredictorData(rank: number): ScorePredictorData[] {
//   const years = ["2022", "2023", "2024", "2025"];
//   const result: ScorePredictorData[] = [];

//   for (const yearStr of years) {
//     const year = parseInt(yearStr);
//     const yearData = rank_data.filter((data) => data.year === yearStr);

//     if (yearData.length === 0) {
//       result.push({ value: 0, year });
//       continue;
//     }

//     const closestEntry = findClosestScoreEntry(rank, yearData);
//     result.push({
//       value: parseInt(closestEntry.score),
//       year: year,
//     });
//   }

//   return result;
// }

// Function to compare the score and return results
export const getScorePredictorData = (score: number): RankPredictorData[] => {
  // Group data by year
  const dataByYear = rank_data.reduce((acc: Record<string, any[]>, item) => {
    const year = item.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});
  const resultArray: RankPredictorData[] = []; // This will hold the final results
  // For each year, find the closest match
  for (const year in dataByYear) {
    let closestMatch: any = null;
    let closestDifference = Infinity; // Initialize to a large value
    dataByYear[year].forEach((item) => {
      const minRank = parseInt(item.min_rank);
      const maxRank = parseInt(item.max_rank);
      // Calculate the differences between entered score and the min/max rank
      const minRankDifference = Math.abs(score - minRank);
      const maxRankDifference = Math.abs(score - maxRank);
      // Find the closest rank (either min_rank or max_rank)
      const closestRankDifference = Math.min(
        minRankDifference,
        maxRankDifference
      );
      // Check if this is the closest match found so far
      if (closestRankDifference < closestDifference) {
        closestDifference = closestRankDifference;
        closestMatch = item;
      }
    });
    // If we found a closest match for this year, push to the resultArray
    if (closestMatch) {
      resultArray.push({
        value: parseInt(closestMatch.score), // closest score
        year: parseInt(year), // year
      });
    }
  }
  return resultArray; // Return the results as an array
};
