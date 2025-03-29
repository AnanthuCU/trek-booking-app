import React from "react";
import styles from "./ToolHeader.module.css";
// import { makePayment } from "@/utils/payments/payments";
type Props = {
  toolTitle: string;
  toolSubtitle: string;
};

const ToolHeader = ({ toolTitle, toolSubtitle }: Props) => {
  return (
    <div className={styles["--pl-tool-header-container"]}>
      <h3
        // onClick={() => makePayment("e3b9f200-6d39-468b-8692-241b8304d318")}
        className={styles["--title"]}
      >
        {toolTitle}
      </h3>
      <p className={styles["--subtitle"]}>{toolSubtitle}</p>
    </div>
  );
};

export default ToolHeader;
