import ExternalLinkSvg from "@/common/tool/svgs/ExternalLinkSvg";
import React from "react";
import styles from "./LinkChip.module.css";

type Props = {
  link: string;
  text: string;
  variant?: string;
};

const LinkChip = ({ text, link, variant = "enabled" }: Props) => {
  return (
    <a
      href={link}
      className={
        variant === "enabled"
          ? `${styles["--view-more-container"]} ${styles["--pl-view-more-enabled"]}`
          : `${styles["--view-more-container"]} ${styles["--pl-view-more-disabled"]}`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
      <span className={styles["--pl-view-more-icon"]}>
        <ExternalLinkSvg />
      </span>
    </a>
  );
};

export default LinkChip;
