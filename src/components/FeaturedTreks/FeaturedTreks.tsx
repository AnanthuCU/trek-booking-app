"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
// import { Trek } from "@/store/slices/trekSlice";
import { Trek } from "@/types/trekTypes";
import styles from "./FeaturedTreks.module.css";

const FeaturedTreks = () => {
  const featuredTreks = useSelector((state: RootState) =>
    state.treks.list.filter((trek: Trek) => trek.isFeatured)
  );

  return (
    <div className={styles.featuredTreks}>
      <h2>Featured Treks</h2>
      <div className={styles.trekContainer}>
        {featuredTreks.map((trek: Trek) => (
          <div key={trek.id} className={styles.trekCard}>
            <h3>{trek.name}</h3>
            <p>{trek.description}</p>
            <p className={styles.price}>Price: ${trek.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTreks;
