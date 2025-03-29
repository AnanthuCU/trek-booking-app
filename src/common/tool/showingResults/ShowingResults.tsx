import React from "react";
import styles from "./ShowingResults.module.css";

type Props = {
  results: any;
  total?: number;
};

const ShowingResults = ({ results, total }: Props) => {
  return (
    <div className={styles["results-container"]}>
      {total && <p className={styles["--title"]}>Showing results</p>}
      <p className={styles["--value"]}>
        {total ? `${results}/${total}` : `${results}`} Records
      </p>
    </div>
  );
};

export default ShowingResults;
