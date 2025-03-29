import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styles from "./Compare.module.css";
import Toggle from "@/common/tool/toggle/Toggle";
import { View } from "../../types";

type Props = {
  // viewFilterSelect: View[];
  setViewFilterSelect: React.Dispatch<React.SetStateAction<View[]>>;
  year: number;
};

const Compare = ({ setViewFilterSelect, year }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setViewFilterSelect(["Difference View"]);
    } else {
      setViewFilterSelect(["Absolute View"]);
    }
  }, [isOpen]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.compareContainer}
    >
      <Toggle title={"Compare"} isOpen={isOpen} setIsOpen={setIsOpen} />
      <p className={styles.title}>{`Compare with ${year - 1}`}</p>
    </motion.div>
  );
};

export default Compare;
