import React, { Dispatch, SetStateAction } from "react";
import styles from "./Toggle.module.css";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
};

const Toggle = ({ isOpen, setIsOpen, title }: Props) => {
  return (
    <div className={`${styles["dev-tool-toggle"]} ${styles["column-toggle"]}`}>
      <div className={`${styles["toggle-on"]} ${styles["dev-toogle-on-flex"]}`}>
        {/* <p className={styles["chip-label"]}>{`${title} :`}</p> */}
        <div
          className={
            isOpen
              ? `${styles["toggle-container-dev-on"]}`
              : `${styles["toggle-container-dev-off"]}`
          }
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div
            className={
              isOpen
                ? `${styles["toggle-point"]}  ${styles["toggle-point-on"]}`
                : `${styles["toggle-point"]}`
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
