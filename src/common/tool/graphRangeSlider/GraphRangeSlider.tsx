// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// // @ts-ignore
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import styles from "./GraphRangeSlider.module.css";

// interface Props {
//   finalValue: number[];
//   setFinalValue: Dispatch<SetStateAction<number[]>>;
//   title?: string;
//   minMaxData: number[];
// }

// const GraphRangeSlider = ({
//   title,
//   finalValue,
//   setFinalValue,
//   minMaxData,
// }: Props) => {
//   return (
//     <div className={styles["container"]}>
//       {title && <p className={styles["title"]}>{title}</p>}
//       <div className={`${styles["slider-container"]} range-slider-container`}>
//         <input
//           type="number"
//           value={finalValue[0]}
//           onChange={(e) => {
//             setFinalValue((prev) => {
//               return [parseInt(e.target.value), prev[1]];
//             });
//           }}
//         />
//         <RangeSlider
//           // onThumbDragEnd={(prop: any) => setFinalValue(value)}
//           value={finalValue}
//           onInput={setFinalValue}
//           min={0}
//           max={minMaxData[1]}
//         />
//         <input
//           type="number"
//           value={finalValue[1]}
//           onChange={(e) => {
//             setFinalValue((prev) => {
//               return [prev[0], parseInt(e.target.value)];
//             });
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default GraphRangeSlider;

import React, {
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useEffect,
} from "react";
// @ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import styles from "./GraphRangeSlider.module.css";
import useDebounce from "./useDebounce"; // Import the custom hook

interface Props {
  finalValue: number[];
  setFinalValue: Dispatch<SetStateAction<number[]>>;
  title?: string;
  minMaxData: number[];
}

const GraphRangeSlider = ({
  title,
  finalValue,
  setFinalValue,
  minMaxData,
}: Props) => {
  const [debouncedValue, setDebouncedValue] = useState<number[]>(finalValue);

  const debouncedCallback = useCallback(
    (val: number[]) => {
      setFinalValue(val);
    },
    [setFinalValue]
  );

  useDebounce(debouncedValue, 300, debouncedCallback);

  useEffect(() => {
    setDebouncedValue(finalValue);
  }, [finalValue]);

  const handleInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      setDebouncedValue((prev) => {
        const newValues = [...prev];
        newValues[index] = value;
        return newValues;
      });
    };

  const handleSliderChange = (values: number[]) => {
    setDebouncedValue(values);
  };

  return (
    <div className={styles["container"]}>
      {title && <p className={styles["title"]}>{title}</p>}
      <div className={`${styles["slider-container"]} range-slider-container`}>
        <input
          type="number"
          value={debouncedValue[0]}
          onChange={handleInputChange(0)}
        />
        <RangeSlider
          value={debouncedValue}
          onInput={handleSliderChange}
          min={0}
          max={minMaxData[1]}
        />
        <input
          type="number"
          value={debouncedValue[1]}
          onChange={handleInputChange(1)}
        />
      </div>
    </div>
  );
};

export default GraphRangeSlider;
