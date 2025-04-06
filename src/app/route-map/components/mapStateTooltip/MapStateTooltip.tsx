import React from "react";
import styles from "./MapStateTooltip.module.css";
import { StateData } from "../../types";
import { getPercentage } from "../../utils";

type Props = {
  data: StateData | undefined;
  year: string | number;
};

const MapStateTooltip = ({ data, year }: Props) => {
  const seatDifference = data?.difference.Seats;
  const collegeDifference = data?.difference.Colleges;

  const seatDiffPercentage = data
    ? getPercentage(data.Seats, seatDifference)
    : 0;

  const collegeDiffPercentage = data
    ? getPercentage(data.Colleges, collegeDifference)
    : 0;

  return (
    <div className={styles.container}>
      {data && (
        <>
          <p className={styles.state}>{data.State}</p>
          <p className={styles.tags}>
            Seats: {data.Seats}{" "}
            {!!seatDifference && !!seatDiffPercentage && (
              <span
                className={
                  seatDiffPercentage > 0
                    ? styles.percentage
                    : styles.minusPercentage
                }
              >
                ({seatDiffPercentage}%)
              </span>
            )}
          </p>
          <p className={styles.tags}>
            Colleges: {data.Colleges}{" "}
            {!!collegeDifference && !!collegeDiffPercentage && (
              <span
                className={
                  collegeDiffPercentage > 0
                    ? styles.percentage
                    : styles.minusPercentage
                }
              >
                ({collegeDiffPercentage}%)
              </span>
            )}
          </p>
          <p className={styles.tags}>Year: {year}</p>
        </>
      )}
    </div>
  );
};

export default MapStateTooltip;
