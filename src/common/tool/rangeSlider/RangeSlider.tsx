import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./RangeSlider.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type Props = {
  rankSliderValue: number[] | number;
  setRankSliderValue: Dispatch<SetStateAction<number[] | number>>;
  color: string;
  isMobile?: boolean;
};

const RangeSlider = ({
  rankSliderValue,
  setRankSliderValue,
  color,
  isMobile = false,
}: Props) => {
  const valuetext = (value: number) => {
    return `${value}`;
  };

  const minMaxRef = useRef<any>();
  useEffect(() => {
    let min = 0;
    let max = 9999999;
    min = typeof rankSliderValue === "object" ? rankSliderValue[0] : 0;
    max = typeof rankSliderValue === "object" ? rankSliderValue[1] : 100;
    minMaxRef.current = { min, max };
  }, []);
  // console.log(rankSliderValue, "rank slider value");

  return (
    <div
      className={styles["chip-slider"]}
      // style={graphData ? { marginTop: "44px" } : {}}
    >
      <div className={styles["--cf-slider-container"]} style={{ zIndex: 0 }}>
        <div className={styles["--cf-range-slider-input"]}>
          {typeof rankSliderValue === "object" ? rankSliderValue[0] : 0}
        </div>
        <Box sx={{ width: isMobile ? 94 : 224 }}>
          {/* <Box sx={{ width: graphData ? 200 : 224 }}> */}
          <Slider
            size="small"
            getAriaLabel={() => "Temperature range"}
            // step={10}
            value={rankSliderValue}
            // defaultValue={80}
            max={minMaxRef?.current?.max}
            min={minMaxRef?.current?.min}
            onChange={(e, value) => {
              setRankSliderValue(value);
            }}
            disableSwap={true}
            valueLabelDisplay="off"
            getAriaValueText={valuetext}
            sx={{
              "& .MuiSlider-thumb": {
                color: color,
              },
              "& .MuiSlider-track": {
                color: color,
              },
            }}
          />
        </Box>
        <div className={styles["--cf-range-slider-input"]}>
          {typeof rankSliderValue === "object" ? rankSliderValue[1] : 0}
        </div>
      </div>
      {/* {graphData && (
        <div className={styles["bar-chart-container"]}>
          <BarChart data={graphData} />
        </div>
      )} */}
    </div>
  );
};

export default RangeSlider;
