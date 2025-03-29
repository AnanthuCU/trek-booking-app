"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./RankPredictor.module.css";
import RankPredictorHeader from "../rankPredictorHeader/RankPredictorHeader";
import RankPredictorActions from "../rankPredictorActions/RankPredictorActions";
import { PredictorInput, RankPredictorGraphInputData } from "./types";
import {
  getRankPredictorData,
  getScorePredictorData,
  isRankValid,
  isScoreValid,
  prepareRankPredictorData,
  sampleRankData,
  sampleScoreData,
} from "./utils";
import "react-toastify/dist/ReactToastify.css";
import RankPredictorGraph from "../rankPredictorGraph/RankPredictorGraph";

const RankPredictor = () => {
  const [selectedTool, setSelectedTool] = useState<PredictorInput>("rank");
  const [inputValue, setInputValue] = useState<number | null>(null);

  const [isError, setIsError] = useState(false);

  const [rankInputValue, setRankInputValue] = useState<number | null>(null);
  const [scoreInputValue, setScoreInputValue] = useState<number | null>(null);

  const invalidRankError = "Please enter a valid score between 1 and 720";
  const invalidScoreError = "Please enter a valid rank";

  const [predictedRankData, setPredictedRankData] =
    useState<RankPredictorGraphInputData | null>(null);
  const [predictedScoreData, setPredictedScoreData] =
    useState<RankPredictorGraphInputData | null>(null);

  const handleFormSubmit = () => {
    const validatedInput =
      selectedTool === "rank"
        ? isRankValid(rankInputValue)
        : isScoreValid(scoreInputValue);

    if (validatedInput) {
      setIsError(false);
      if (selectedTool === "rank") {
        const reqObj = {
          tool: selectedTool,
          value: inputValue,
        };
        if (rankInputValue) {
          const predictedRankData = getRankPredictorData(rankInputValue);
          setPredictedRankData(
            prepareRankPredictorData(predictedRankData, selectedTool)
          );
          // console.log("reqObj and data", reqObj, predictedRankData);
        }
      } else {
        const reqObj = {
          tool: selectedTool,
          value: inputValue,
        };

        if (!scoreInputValue) return;
        const predictedScoreData = getScorePredictorData(scoreInputValue);
        setPredictedScoreData(
          prepareRankPredictorData(predictedScoreData, selectedTool)
        );
      }
    } else {
      setIsError(true);
    }
  };

  const sampleData = prepareRankPredictorData(
    selectedTool === "rank" ? sampleRankData : sampleScoreData,
    selectedTool
  );

  const getSelectedToolData = useCallback(() => {
    if (selectedTool === "rank") {
      return predictedRankData ? predictedRankData : sampleData;
    } else {
      return predictedScoreData ? predictedScoreData : sampleData;
    }
  }, [selectedTool, predictedRankData, predictedScoreData]);

  useEffect(() => {
    const validatedInput =
      selectedTool === "rank"
        ? isRankValid(rankInputValue)
        : isScoreValid(scoreInputValue);

    const selectedInput =
      selectedTool === "rank" ? rankInputValue : scoreInputValue;

    if (selectedInput) {
      if (validatedInput) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  }, [selectedTool]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerWithActions}>
          <RankPredictorHeader
            isDemo={
              !(selectedTool === "rank"
                ? predictedRankData
                  ? true
                  : false
                : predictedScoreData
                ? true
                : false)
            }
          />
          <RankPredictorActions
            selectedOption={selectedTool}
            setSelectedOption={setSelectedTool}
            inputValue={
              selectedTool === "rank" ? rankInputValue : scoreInputValue
            }
            setInputValue={
              selectedTool === "rank" ? setRankInputValue : setScoreInputValue
            }
            handleFormSubmit={handleFormSubmit}
            buttonClickable={
              selectedTool === "rank" ? !!rankInputValue : !!scoreInputValue
            }
            isError={isError}
            errorMsg={
              selectedTool === "rank" ? invalidRankError : invalidScoreError
            }
          />
        </div>
        <RankPredictorGraph
          inputData={getSelectedToolData()}
          selectedTool={selectedTool}
        />
      </div>
    </>
  );
};

export default RankPredictor;
