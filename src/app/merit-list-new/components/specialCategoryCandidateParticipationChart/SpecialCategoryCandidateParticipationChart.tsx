import React from "react";
import { CategoryData, DataPoint, MeritListTooltip } from "../../types";
import RadarChart from "../../charts/radarChart/RadarChart";
import { convertKeyValueObject, prepareCordData } from "../../utils";
import styles from "./SpecialCategoryCandidateParticipationChart.module.css";
import MeritListTable from "../meritListTable/MeritListTable";
import SpiderChart from "../../charts/spiderChart/SpiderChart";

type Props = {
  data: CategoryData[];
  tooltipId: string;
  handleMouseMove: (d: DataPoint) => void;
  handleMouseLeave: () => void;
  tooltipContent: MeritListTooltip | undefined;
};

const SpecialCategoryCandidateParticipationChart = ({
  data,
  tooltipContent,
  tooltipId,
  handleMouseLeave,
  handleMouseMove,
}: Props) => {
  const headers = ["Seat Type", "Total Seats"];
  return (
    <div className={styles.container}>
      {/* <RadarChart
        data={[convertKeyValueObject(data)]}
        cordData={prepareCordData(data)}
        tooltipId={tooltipId}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
      /> */}
      <SpiderChart
        data={data.map((record) => {
          return {
            category: record.category,
            value: record.value,
          };
        })}
        tooltipId={tooltipId}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
      />
      <div className={styles.table}>
        <MeritListTable
          headers={headers}
          data={[...data]
            .sort((a, b) => b.value - a.value)
            .map((record, index) => {
              return {
                column: record.category,
                value: record.value,
                color: "#FAA2A2",
              };
            })}
          total={data.reduce(
            (accumulator, currentItem) => accumulator + currentItem.value,
            0
          )}
          tooltipContent={tooltipContent}
        />
      </div>
    </div>
  );
};

export default SpecialCategoryCandidateParticipationChart;
