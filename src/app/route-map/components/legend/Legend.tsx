import { motion } from "framer-motion";
import React from "react";
import styles from "./Legend.module.css";

export const legendColors = [
  "#E8F6FF",
  "#CCECFF",
  "#B7E4FF",
  "#ABDFFF",
  "#9DDAFF",
  "#7BCDFE",
];

const Legend = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.legendContainer}
    >
      <div className={styles.legendText}>
        <p>
          Low
          <br />
          Seats
        </p>
        <p>
          High
          <br />
          Seats
        </p>
      </div>

      <div className={styles.legendColors}>
        {legendColors.map((legend, index) => {
          return (
            <div
              className={styles.legend}
              key={index}
              style={{ backgroundColor: legend }}
            ></div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Legend;
