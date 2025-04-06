import React from "react";
import { InstituteSummary } from "../../types";
import styles from "./InstituteTypeProgress.module.css";
import { formatIndianCurrencyCommas } from "@/common/tool/formatIndianCurrencyCommas/rankPredictor/utils";
import { markColors } from "../../utils";

type Props = {
  summarizedInstituteTypes: InstituteSummary[];
  distributionFilterSelect: string;
};

const InstituteTypeProgress = ({
  summarizedInstituteTypes,
  distributionFilterSelect,
}: Props) => {
  const getPercentage = (value: number) => {
    let total = 0;
    summarizedInstituteTypes.forEach((item) => {
      if (distributionFilterSelect === "Seats") {
        total += item.Seats;
      } else {
        total += item.Colleges;
      }
    });
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const sortFn = (a: InstituteSummary, b: InstituteSummary) => {
    if (distributionFilterSelect === "Seats") {
      return b.Seats - a.Seats;
    } else {
      return b.Colleges - a.Colleges;
    }
  };

  return (
    <div className={styles.container}>
      {summarizedInstituteTypes
        .sort((a, b) => sortFn(a, b))
        .map((instType, index) => {
          return (
            <div key={index} className={styles.progressContainer}>
              <div className={styles.content}>
                <p>{`${instType.InstituteType} (${
                  distributionFilterSelect === "Seats"
                    ? formatIndianCurrencyCommas(instType.Colleges)
                    : formatIndianCurrencyCommas(instType.Seats)
                })`}</p>
                <p>
                  {distributionFilterSelect === "Seats"
                    ? formatIndianCurrencyCommas(instType.Seats)
                    : formatIndianCurrencyCommas(instType.Colleges)}
                </p>
              </div>
              <div className={styles.progress}>
                <span>
                  <div
                    style={{
                      // @ts-ignore
                      backgroundColor: markColors[instType.InstituteType],
                      width: `${getPercentage(
                        distributionFilterSelect === "Seats"
                          ? instType.Seats
                          : instType.Colleges
                      )}%`,
                    }}
                    className={styles.bar}
                  ></div>
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default InstituteTypeProgress;
