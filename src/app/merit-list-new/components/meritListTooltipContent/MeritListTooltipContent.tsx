import React from "react";
import styles from "./MeritListTooltipContent.module.css";
import { formatToRupees } from "@/app/closing-rank-analysis/utils";
import RankUpSvg from "@/utils/svgs/tools/RankUpSvg";
import RankDownSvg from "@/utils/svgs/tools/RankDownSvg";
import { MeritListTooltip } from "../../types";

type Props = {
  content: MeritListTooltip | undefined;
};

const MeritListTooltipContent = ({ content }: Props) => {
  return content ? (
    <div className={styles.container}>
      <p className={styles.value}>{formatToRupees(content.value)}</p>
      {/* comparison data */}
      {content?.diff && (
        <div
          className={styles.diff}
          style={{ color: content.diff.difference > 0 ? "#16C784" : "#EA3943" }}
        >
          <p className={styles.diffValue}>
            {content.diff.difference} ({content.diff.percentage.toFixed(2)}%)
            <span>
              {content.diff.difference > 0 ? <RankUpSvg /> : <RankDownSvg />}
            </span>
          </p>
          <p className={styles.diffYear}>
            {content.diff.prevYear} vs {content.diff.currentYear}
          </p>
        </div>
      )}
      <p className={styles.year}>{content.year}</p>
      <p className={styles.column}>{content.column}</p>
    </div>
  ) : null;
};

export default MeritListTooltipContent;
