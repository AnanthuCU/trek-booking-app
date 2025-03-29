"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./FullScreenMeritList.module.css";
import { Tooltip } from "react-tooltip";
import { meritListSectionIds } from "../../data";

type Props = {
  sectionId: string;
};
const tooltipId = "full-screen-tooltip";

const FullScreenOffSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      data-tooltip-id={tooltipId}
    >
      <rect width="34" height="34" rx="6" fill="#F6F6F6" />
      <path
        d="M21 8H27V14H25V10H21V8ZM7 8H13V10H9V14H7V8ZM25 24V20H27V26H21V24H25ZM9 24H13V26H7V20H9V24Z"
        fill="#6D6D6D"
      />
    </svg>
  );
};

const FullScreenOnSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      data-tooltip-id={tooltipId}
    >
      <rect width="34" height="34" rx="6" fill="#F6F6F6" />
      <path
        d="M23.264 12.066H27.33V14.099H21.231V8H23.264V12.066ZM13.099 14.099H7V12.066H11.066V8H13.099V14.099ZM23.264 22.231V26.297H21.231V20.198H27.33V22.231H23.264ZM13.099 20.198V26.297H11.066V22.231H7V20.198H13.099Z"
        fill="#6D6D6D"
      />
    </svg>
  );
};

const FullScreen = ({ sectionId }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const counterRef = useRef(0);

  // effect to hide and un hide the navbar
  useEffect(() => {
    const navBar = document.getElementById("cr-side-bar");
    const isDesktop = window.innerWidth > 1024;

    const bodyWrapper = document.getElementsByClassName("body_wrapper");

    meritListSectionIds
      .filter((id) => id !== sectionId)
      .forEach((chartSectionId) => {
        const ele = document.getElementById(chartSectionId);
        if (ele) {
          ele.style.display = isFullScreen ? "none" : "flex";
        }
      });

    // scroll to top while hiding elements
    const targetEle = document.getElementById(sectionId);
    if (targetEle && isFullScreen && counterRef.current > 1) {
      targetEle.scrollIntoView({ block: "center", behavior: "instant" });
    }

    if (navBar && isDesktop) {
      navBar.style.display = isFullScreen ? "none" : "flex";
      const bodyWrapperElement = bodyWrapper[0] as HTMLElement;
      bodyWrapperElement.style.width = isFullScreen
        ? "100%"
        : "calc(100% - 88px)";
    }

    if (!isFullScreen && counterRef.current > 1) {
      // console.log("exit full screen", sectionId);
      document.getElementById(sectionId)?.scrollIntoView({ block: "nearest" });
    }

    counterRef.current = counterRef.current + 1;

    return () => {
      if (navBar && isDesktop) {
        navBar.style.display = "flex";
      }
    };
  }, [isFullScreen]);

  return (
    <>
      <Tooltip
        id={tooltipId}
        // variant="light"
        opacity="1"
        className={styles.tooltipContainer}
      >
        <p className={styles.tooltip}>
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </p>
      </Tooltip>
      <div
        className={styles.container}
        onClick={() => setIsFullScreen((prev) => !prev)}
        // data-tooltip-id={tooltipId}
      >
        {isFullScreen ? <FullScreenOnSvg /> : <FullScreenOffSvg />}
      </div>
    </>
  );
};

export default FullScreen;
