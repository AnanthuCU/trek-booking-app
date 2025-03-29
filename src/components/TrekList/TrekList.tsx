"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Trek } from "@/types/trekTypes";
import Link from "next/link"; // ✅ Import Link
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
            
            {/* ✅ Route Analysis Link */}
            <Link href={`/treks/${trek.id}`} className={styles.routeLink}>
              Route Analysis
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrekList;
