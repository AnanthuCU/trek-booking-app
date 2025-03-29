import { collegeData } from "./data";
import { indiaGeoJson } from "./indiaGeoJson2";
import {
  CollegeMetaData,
  CounsellingType,
  InstituteData,
  RawInstituteData,
  StateSummary,
  YearData,
} from "./types";

export const getMinMax = (arr: number[]) => {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  arr.forEach((num) => {
    if (num > max) {
      max = num;
    }
    if (num < min) {
      min = num;
    }
  });

  return [min, max];
};

export const getStatesFromMapData = () => {
  return indiaGeoJson.features.map((feature, index: number) => {
    return {
      id: `${index}`,
      name: feature.properties.st_nm,
    };
  });
};

export function summarizeByState(
  data: RawInstituteData[],
  counsellingType: CounsellingType
) {
  const stateSummary: { [key: string]: { Seats: number; Colleges: number } } =
    {};

  const instituteTypeSet = new Set<string>();

  data.forEach((institute) => {
    const { State, Total, MCC, StateName, InstituteType } = institute;
    let Seats = Total;
    if (counsellingType === "All") Seats = Total;
    if (counsellingType === "MCC") Seats = MCC;
    if (counsellingType === "State") Seats = State;

    if (parseInt(Seats)) {
      if (!stateSummary[StateName]) {
        stateSummary[StateName] = { Seats: 0, Colleges: 0 };
      }
      stateSummary[StateName].Seats += parseInt(Seats);
      stateSummary[StateName].Colleges += 1;
      instituteTypeSet.add(InstituteType);
    }
  });

  return {
    data: Object.keys(stateSummary).map((state) => ({
      State: state,
      Seats: stateSummary[state].Seats,
      Colleges: stateSummary[state].Colleges,
    })),
    instituteTypes: Array.from(instituteTypeSet)
      .map((item, index) => {
        return {
          id: `${index}`,
          name: item,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}
// export function summarizeByState(data: InstituteData[]) {
//   const stateSummary: { [key: string]: { Seats: number; Colleges: number } } =
//     {};

//   const instituteTypeSet = new Set<string>();

//   data.forEach((institute) => {
//     const { State, Seats, "Institute Type": InstituteType } = institute;

//     if (!stateSummary[State]) {
//       stateSummary[State] = { Seats: 0, Colleges: 0 };
//     }

//     stateSummary[State].Seats += Seats;
//     stateSummary[State].Colleges += 1;

//     instituteTypeSet.add(InstituteType);
//   });

//   return {
//     data: Object.keys(stateSummary).map((state) => ({
//       State: state,
//       Seats: stateSummary[state].Seats,
//       Colleges: stateSummary[state].Colleges,
//     })),
//     instituteTypes: Array.from(instituteTypeSet)
//       .map((item, index) => {
//         return {
//           id: `${index}`,
//           name: item,
//         };
//       })
//       .sort((a, b) => a.name.localeCompare(b.name)),
//   };
// }

export function getDifferenceForYears(
  collegeData: RawInstituteData[],
  years: number[],
  counsellingType: CounsellingType
): YearData {
  const result: YearData = {};

  for (const year of years) {
    const { data: currentYearData } = summarizeByState(
      collegeData.filter((item) => parseInt(item.Year) === year),
      counsellingType
    );
    const { data: prevYearData } = summarizeByState(
      collegeData.filter((item) => parseInt(item.Year) === year - 1),
      counsellingType
    );

    const yearWithDifference = currentYearData.map((stateData) => {
      const prevStateData = prevYearData.find(
        (state) => state.State === stateData.State
      );

      let difference = { Seats: 0, Colleges: 0 };
      if (prevStateData) {
        difference = {
          Seats: stateData.Seats - prevStateData.Seats,
          Colleges: stateData.Colleges - prevStateData.Colleges,
        };
      }

      return {
        ...stateData,
        difference,
      };
    });

    result[year] = yearWithDifference;
  }

  return result;
}
// export function getDifferenceForYears(
//   collegeData: InstituteData[],
//   years: number[]
// ): YearData {
//   const result: YearData = {};

//   for (const year of years) {
//     const { data: currentYearData } = summarizeByState(
//       collegeData.filter((item) => item.Year === year)
//     );
//     const { data: prevYearData } = summarizeByState(
//       collegeData.filter((item) => item.Year === year - 1)
//     );

//     const yearWithDifference = currentYearData.map((stateData) => {
//       const prevStateData = prevYearData.find(
//         (state) => state.State === stateData.State
//       );

//       let difference = { Seats: 0, Colleges: 0 };
//       if (prevStateData) {
//         difference = {
//           Seats: stateData.Seats - prevStateData.Seats,
//           Colleges: stateData.Colleges - prevStateData.Colleges,
//         };
//       }

//       return {
//         ...stateData,
//         difference,
//       };
//     });

//     result[year] = yearWithDifference;
//   }

//   return result;
// }

// export function summarizeByInstituteType(data: InstituteData[]) {
//   const instituteTypeSummary: {
//     [key: string]: { Seats: number; Colleges: number };
//   } = {};

//   data.forEach((institute) => {
//     const { Seats, "Institute Type": InstituteType } = institute;

//     if (!instituteTypeSummary[InstituteType]) {
//       instituteTypeSummary[InstituteType] = { Seats: 0, Colleges: 0 };
//     }

//     instituteTypeSummary[InstituteType].Seats += Seats;
//     instituteTypeSummary[InstituteType].Colleges += 1;
//   });

//   return Object.keys(instituteTypeSummary).map((type) => ({
//     InstituteType: type,
//     Seats: instituteTypeSummary[type].Seats,
//     Colleges: instituteTypeSummary[type].Colleges,
//   }));
// }

export function summarizeByInstituteType(
  data: RawInstituteData[],
  counsellingType: CounsellingType
) {
  const instituteTypeSummary: {
    [key: string]: { Seats: number; Colleges: number };
  } = {};

  data.forEach((institute) => {
    const { Total, MCC, State, InstituteType } = institute;

    let Seats = Total;
    if (counsellingType === "All") Seats = Total;
    if (counsellingType === "MCC") Seats = MCC;
    if (counsellingType === "State") Seats = State;

    if (parseInt(Seats)) {
      if (!instituteTypeSummary[InstituteType]) {
        instituteTypeSummary[InstituteType] = { Seats: 0, Colleges: 0 };
      }

      instituteTypeSummary[InstituteType].Seats += parseInt(Seats);
      instituteTypeSummary[InstituteType].Colleges += 1;
    }
  });

  return Object.keys(instituteTypeSummary).map((type) => ({
    InstituteType: type,
    Seats: instituteTypeSummary[type].Seats,
    Colleges: instituteTypeSummary[type].Colleges,
  }));
}

export const getPercentage = (
  total: number | undefined,
  increase: number | undefined
) => {
  // if (!total || !increase) return 0;
  if (!total) return 0;
  if (increase === undefined) return 0;

  return Math.round((increase / total) * 100);
};

export const printUniqueInstitutes = () => {
  const uniqueInstituteSet = new Set();
  collegeData.forEach((college) => {
    uniqueInstituteSet.add(college["Institute Name"]);
  });

  const uniqueInstitutes: CollegeMetaData[] = [];
  uniqueInstituteSet.forEach((name) => {
    const college = collegeData.find((item) => item["Institute Name"] === name);
    if (college) {
      const instituteRecord = {
        name: college["Institute Name"],
        instituteType: college["Institute Type"],
        state: college.State,
        coordinates: {
          x: 0,
          y: 0,
        },
      };
      uniqueInstitutes.push(instituteRecord);
    }
  });
};

export const markColors: { [key: string]: string } = {
  Deemed: "rgba(255, 117, 117, 1)",
  "Government Institute": "rgba(25, 153, 252, 1)",
  "Private Institute": "rgba(250, 189, 0, 1)",
  AFMC: "rgba(71, 149, 10, 1)",
  AIIMS: "rgba(149, 117, 255, 1)",
  "Central University": "rgba(122, 85, 50, 1)",
  JIPMER: "rgba(4, 195, 122, 1)",
};

export const getSeats = (
  institute: RawInstituteData,
  counsellingType: CounsellingType
) => {
  const { Total, MCC, State } = institute;
  let Seats = Total;
  if (counsellingType === "All") Seats = Total;
  if (counsellingType === "MCC") Seats = MCC;
  if (counsellingType === "State") Seats = State;

  return Seats;
};
