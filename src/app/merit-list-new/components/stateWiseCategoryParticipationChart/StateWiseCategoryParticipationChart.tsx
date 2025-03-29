import React, { useEffect } from "react";
import { CategoryData, MeritListTooltip } from "../../types";
import RadialPieChart from "../../charts/radialPieChart/RadialPieChart";
import styles from "./StateWiseCategoryParticipationChart.module.css";
import MeritListTable from "../meritListTable/MeritListTable";

type Props = {
  data: CategoryData[];
  tooltipId: string;
  handleMouseMove: (data: CategoryData) => void;
  handleMouseLeave: () => void;
  tooltipContent: MeritListTooltip | undefined;
};

const StateWiseCategoryParticipationChart = ({
  data,
  tooltipId,
  handleMouseMove,
  tooltipContent,
  handleMouseLeave,
}: Props) => {
  // const valueAccessor = (record: any) => record.value;
  // const categoryAccessor = (record: any) => record.category;

  // const x = [
  //   Math.min(...data.map(valueAccessor)) <= 0
  //     ? 1
  //     : Math.min(...data.map(valueAccessor)),
  //   Math.max(...data.map(valueAccessor)),
  // ];

  // const y = data.map(categoryAccessor);

  // table properties
  const headers = ["Category", "Seats"];

  return (
    <div className={styles.container}>
      <RadialPieChart
        data={data}
        // x={x}
        // y={y}
        tooltipId={tooltipId}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
      />
      <div className={styles.table}>
        <MeritListTable
          headers={headers}
          data={data.map((record) => {
            return {
              column: record.category,
              value: record.value,
              color: "#E9FFD6",
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

export default StateWiseCategoryParticipationChart;
