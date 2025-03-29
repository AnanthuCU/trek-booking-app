import React, { useEffect, useRef, useState } from "react";
import styles from "./MeritListTable.module.css";
import SeatSvg from "../seatSvg/SeatSvg";
import { MeritListTooltip } from "../../types";
import { hexToRgb } from "@mui/material";
import { hexToRgba } from "../../utils";

type Body = {
  column: string;
  value: number;
  color?: string;
};

type Props = {
  data: Body[];
  isSeatIconRequired?: boolean;
  tooltipContent: MeritListTooltip | undefined;
  headers: string[];
  total?: number;
  isLegendVisible?: boolean;
};

const MeritListTable = ({
  data,
  isSeatIconRequired = true,
  tooltipContent,
  headers,
  total,
  isLegendVisible = false,
}: Props) => {
  const childRefs = useRef<any>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [scrollToIndex, setScrollToIndex] = useState<number>();
  const defaultHoverColor = "#f0f8ff";

  useEffect(() => {
    if (
      scrollToIndex !== null &&
      scrollToIndex !== undefined &&
      childRefs.current[scrollToIndex]
    ) {
      if (bodyRef.current) {
        const headerHeight = 50; // Set this to the actual height of your header (in px)
        const scrollLevel = scrollToIndex * 26; // Assuming each item has a height of 26px

        // Adjust the scroll level to account for the header
        bodyRef.current.scrollTo({
          top: scrollLevel - headerHeight, // Subtract header height to make sure it’s not covered
          behavior: "smooth",
        });
      }
    }
  }, [scrollToIndex]);

  useEffect(() => {
    const index = data.findIndex(
      (item) =>
        item.column === tooltipContent?.column &&
        item.value === tooltipContent.value
    );
    setScrollToIndex((prev) => index);
  }, [tooltipContent]);

  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        {headers.map((head, index) => {
          return <p key={index}>{head}</p>;
        })}
      </div>
      <div className={styles.body} ref={bodyRef}>
        {data.map((record: any, index: number) => {
          const isSelected =
            tooltipContent?.column === record.column &&
            tooltipContent?.value === record.value;
          return (
            <div
              className={styles.rows}
              style={{
                backgroundColor: isSelected
                  ? record?.color
                    ? hexToRgba(record.color, 0.3)
                    : defaultHoverColor
                  : "",
              }}
              //   @ts-ignore
              ref={(el) => (childRefs.current[index] = el)}
              key={index}
            >
              <p className={styles.seats}>
                {isLegendVisible && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                  >
                    <ellipse
                      cx="3.76712"
                      cy="4.07038"
                      rx="3.27103"
                      ry="3.28913"
                      fill={record?.color || defaultHoverColor}
                    />
                  </svg>
                )}

                {record.column}
              </p>
              <p className={styles.seats}>
                {isSeatIconRequired ? <SeatSvg /> : null}
                {record.value}
              </p>
              {/* {record.map((item: any, index: number) => {
                return (
                  <p key={index} className={styles.seats}>
                    {index === 1 && isSeatIconRequired ? <SeatSvg /> : null}
                    {item}
                  </p>
                );
              })} */}
            </div>
          );
        })}
      </div>
      {total && (
        <div className={styles.footer}>
          <p>Total</p>
          <p className={styles.seats}>
            {isSeatIconRequired && <SeatSvg />}
            {total}
          </p>
        </div>
      )}
    </div>
  );
};

export default MeritListTable;
