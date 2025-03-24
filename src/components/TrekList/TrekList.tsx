"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
// import { Trek } from "@/store/slices/trekSlice";
import { Trek } from "@/types/trekTypes";
import styles from "./TrekList.module.css";

const TrekList = () => {
  const treks = useSelector((state: RootState) => state.treks.list);

  return (
    <div className={styles.trekList}>
      <h2>All Treks</h2>
      <div className={styles.trekContainer}>
        {treks.map((trek: Trek) => (
          <div key={trek.id} className={styles.trekCard}>
            <h3>{trek.name}</h3>
            <p>{trek.description}</p>
            <p className={styles.price}>Price: ${trek.price}</p>
            <p>Route Analysis</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrekList;
