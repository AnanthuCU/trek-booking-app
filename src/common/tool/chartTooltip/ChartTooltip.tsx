"use client";
import React from "react";
import styles from "./ChartTooltip.module.css";
import { Tooltip } from "react-tooltip";
import useWindowWidth from "./useWindowWidth";
type Props = {
  children: React.ReactNode;
  tooltipId: string;
};

const ChartTooltip = ({ children, tooltipId }: Props) => {
  const windowWidth = useWindowWidth(200);

  const isMobile = windowWidth < 500;

  return (
    <Tooltip
      id={tooltipId}
      noArrow={isMobile ? true : false}
      variant="light"
      opacity="1"
      float={isMobile ? false : true}
      place={isMobile ? "top" : "right"}
      offset={isMobile ? 0 : 30}
      className={styles.container}
      // openOnClick={isMobile ? true : false}
      openEvents={{
        mouseenter: true,
        focus: true,
        mouseover: true,
        click: true,
        dblclick: true,
        mousedown: true,
      }}
      closeEvents={{
        mouseleave: true,
        blur: true,
        mouseout: true,
        click: true,
        dblclick: true,
        mouseup: true,
      }}
    >
      {children}
    </Tooltip>
  );
};

export default ChartTooltip;
