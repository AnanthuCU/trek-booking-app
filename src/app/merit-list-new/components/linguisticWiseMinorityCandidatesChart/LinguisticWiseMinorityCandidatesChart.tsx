import React from "react";
import {
  LinguisticWiseMinorityCandidatesData,
  MeritListTooltip,
} from "../../types";
import GaugeChart from "../../charts/gaugeChart/GaugeChart";
import LinguisticWiseMinorityCandidatesChartGradients from "./LinguisticWiseMinorityCandidatesChartGradients";
import styles from "./LinguisticWiseMinorityCandidatesChart.module.css";
import MeritListTable from "../meritListTable/MeritListTable";

type Props = {
  data: LinguisticWiseMinorityCandidatesData[];
  tooltipId: string;
  handleMouseMove: (d: LinguisticWiseMinorityCandidatesData) => void;
  handleMouseLeave: () => void;
  tooltipContent: MeritListTooltip | undefined;
};

const LinguisticWiseMinorityCandidatesChart = ({
  data,
  tooltipId,
  handleMouseMove,
  tooltipContent,
  handleMouseLeave,
}: Props) => {
  const gradients = ["url(#one)", "url(#two)", "url(#three)", "url(#four)"];

  // const colors = ["#FF5371", "#48D1E9", "#FEA30A", "#9579E6"];

  const colors = [
    {
      color: "#FF5371",
      gradient: "url(#one)",
    },
    {
      color: "#48D1E9",
      gradient: "url(#two)",
    },
    {
      color: "#FEA30A",
      gradient: "url(#three)",
    },
    {
      color: "#9579E6",
      gradient: "url(#four)",
    },
  ];

  const headers = ["Seat Type", "Total Seats"];

  return (
    <div className={styles.container}>
      <GaugeChart
        data={data.sort((a, b) => a.value - b.value)}
        // gradients={gradients}
        gradients={colors.map((item) => item.gradient)}
        tooltipId={tooltipId}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
      >
        <LinguisticWiseMinorityCandidatesChartGradients />
      </GaugeChart>
      <div className={styles.table}>
        <MeritListTable
          headers={headers}
          data={[...data]
            .sort((a, b) => b.value - a.value)
            .map((record, index) => {
              return {
                column: record.lingual,
                value: record.value,
                color: colors[index].color,
              };
            })}
          total={data.reduce(
            (accumulator, currentItem) => accumulator + currentItem.value,
            0
          )}
          tooltipContent={tooltipContent}
          isLegendVisible={true}
        />
      </div>
    </div>
  );
};

export default LinguisticWiseMinorityCandidatesChart;
