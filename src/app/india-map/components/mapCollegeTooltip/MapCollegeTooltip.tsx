import React from "react";
import styles from "./MapCollegeTooltip.module.css";
import { CollegeData } from "../../types";
import { getPercentage } from "../../utils";

type Props = {
  data: CollegeData | undefined;
  year: string | number;
};

const MapCollegeTooltip = ({ data, year }: Props) => {
  const seatDifference = data?.difference.Seats;

  const seatDiffPercentage = data
    ? getPercentage(data.Seats, seatDifference)
    : 0;

  return (
    <div className={styles.container}>
      {data && (
        <>
          <p className={styles.state}>{data.State}</p>
          <p className={styles.tags}>Institute Type: {data.InstituteType}</p>
          <p className={styles.tags}>
            Seats: {data.Seats}{" "}
            {!!seatDifference && !!seatDiffPercentage && (
              <span className={styles.percentage}>({seatDiffPercentage}%)</span>
            )}
          </p>
          {/* <p className={styles.tags}>
            Colleges: {data.Colleges}{" "}
            {!!collegeDifference && !!collegeDiffPercentage && (
              <span className={styles.percentage}>
                ({collegeDiffPercentage}%)
              </span>
            )}
          </p> */}
          {/* <p className={styles.tags}>Year: {year}</p> */}
        </>
      )}
    </div>
  );
};

export default MapCollegeTooltip;
