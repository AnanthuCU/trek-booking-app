// @ts-nocheck

import { isNumeric } from "@/utils/tools/utils";

export const rankPallete = {
  "01 - 10 Percentile (NEET 2022)": "green",
  "11 - 40 Percentile (NEET 2022)": "orange",
  "41 - 99 Percentile (NEET 2022)": "red",
  // "NEET 2022 - 01 - 10 Percentile": "#ee82ee",
  // "NEET 2022 - 11 - 40 Percentile": "#6600ff",
  // "NEET 2022 - 41 - 99 Percentile": "#ec4176",
};

export const getRankColor = (rank: string | number | number[]) => {
  let rankInt = parseInt(rank[0]);
  if (rankInt < 9999) {
    return rankPallete["01 - 10 Percentile (NEET 2022)"];
  } else if (rankInt > 9999 && rankInt < 99999) {
    return rankPallete["11 - 40 Percentile (NEET 2022)"];
  } else if (rankInt > 99999) {
    return rankPallete["41 - 99 Percentile (NEET 2022)"];
  }
};

export const formatCurrency = (value: number | string) => {
  if (isNumeric(value)) {
    let intValue = parseInt(value);
    if (isNaN(intValue)) return null;
    if (intValue < 0) return "-";
    if (intValue < 99999) {
      return `₹${intValue.toLocaleString()}`;
    } else if (intValue < 9999999 && intValue >= 100000) {
      let newValue = intValue / 100000;
      return newValue % 1 === 0
        ? `₹${newValue} Lakhs`
        : `₹${newValue.toFixed(1)} Lakhs`;
    } else if (value >= 10000000) {
      let newValue = intValue / 10000000;
      return newValue % 1 === 0
        ? `₹${newValue} Crores`
        : `₹${newValue.toFixed(1)} Crores`;
    }
  } else {
    return value;
  }
};

export function calculateSerialNumber(
  currentPage,
  recordsPerPage,
  indexOnPage
) {
  return (currentPage - 1) * recordsPerPage + indexOnPage;
}

export const textTransform = (text) =>
  text
    .split("")
    .filter((char) => /[a-zA-Z]/.test(char))
    .map((char) => char.toLowerCase())
    .join("");

export const calculateSimilarity = (str1, str2) => {
  function jaccardIndex(set1, set2) {
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  }

  const set1 = new Set(textTransform(str1));
  const set2 = new Set(textTransform(str2));
  return jaccardIndex(set1, set2);
};

export const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
};

export const getSelectText = (): { text: string; excessNumber: number } => {
  let spacedFilter = filterSelectDisplay.map((item, index) => {
    if (index !== 0) {
      return " " + item;
    } else {
      return item;
    }
  });
  let excessNumber = 0;
  let adder = 0;
  spacedFilter.map((item, index) => {
    if ((adder += item.split("").length) >= 32 - index) {
      excessNumber += 1;
    }
  });
  if (excessNumber) {
    return {
      text: `${spacedFilter.toString().slice(0, 31)} ...`,
      excessNumber,
    };
  } else {
    return {
      text: `${spacedFilter.toString().slice(0, 31)}`,
      excessNumber,
    };
  }
};

export const stateSeederData = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Pondicherry",
  "Central",
];
