"use client";
import ChartSection from "@/app/five-year-competition/components/chartSection/ChartSection";
import ChartSectionHeader from "@/app/five-year-competition/components/chartSectionHeader/ChartSectionHeader";
import FactSection from "@/app/five-year-competition/components/factSection/FactSection";
import React, { useState } from "react";
import { linguisticWiseMinorityCandidates } from "../../content";
import FullScreen from "../../components/fullScreenMeritList/FullScreenMeritList";
import ChartFilterDropdown from "@/app/five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";
import { linguisticWiseMinorityCandidatesData } from "../../data";
import LinguisticWiseMinorityCandidatesChart from "../../components/linguisticWiseMinorityCandidatesChart/LinguisticWiseMinorityCandidatesChart";
import ChartTooltip from "@/app/five-year-competition/components/chartTooltip/ChartTooltip";
import {
  LinguisticWiseMinorityCandidatesData,
  MeritListTooltip,
} from "../../types";
import MeritListTooltipContent from "../../components/meritListTooltipContent/MeritListTooltipContent";
import { calculateDifferenceAndPercentage } from "@/app/five-year-competition/utils";

type Props = {};

const LinguisticWiseMinorityCandidates = (props: Props) => {
  const sectionId = "linguisticWiseMinorityCandidatesId";

  // years
  const years = Array.from(
    new Set(linguisticWiseMinorityCandidatesData.map((record) => record.year))
  );
  // states
  const [selectedYear, setSelectedYear] = useState<string[]>([
    Math.max(...years).toString(),
  ]);

  const [tooltipContent, setTooltipContent] = useState<MeritListTooltip>();

  const tooltipId = "linguisticWiseMinorityCandidatesTooltipId";

  const handleMouseMove = (
    mouseOverData: LinguisticWiseMinorityCandidatesData
  ) => {
    const prevYear = mouseOverData.year - 1;
    const prevYearRecord = linguisticWiseMinorityCandidatesData.find(
      (record) =>
        record.year === prevYear &&
        record.lingual === mouseOverData.lingual &&
        record.state === mouseOverData.state
    );

    if (prevYearRecord) {
      const diff = calculateDifferenceAndPercentage(
        mouseOverData.value,
        prevYearRecord.value
      );
      setTooltipContent({
        year: `${selectedYear[0]}`,
        value: mouseOverData.value,
        column: mouseOverData.lingual,
        diff: {
          difference: diff.difference,
          percentage: diff.percentage,
          prevYear: `${prevYear}`,
          currentYear: `${mouseOverData.year}`,
        },
      });
    } else {
      setTooltipContent({
        year: `${selectedYear[0]}`,
        value: mouseOverData.value,
        column: mouseOverData.lingual,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent(undefined);
  };

  return (
    <ChartSection id={sectionId}>
      <ChartSectionHeader
        title={linguisticWiseMinorityCandidates.title}
        subtitle={linguisticWiseMinorityCandidates.subtitle}
      >
        <ChartFilterDropdown
          title={"Year"}
          data={years.map((item) => `${item}`)}
          selected={selectedYear}
          setSelected={setSelectedYear}
          isMultiSelect={false}
        />
        <FullScreen sectionId={sectionId} />
      </ChartSectionHeader>
      <LinguisticWiseMinorityCandidatesChart
        data={linguisticWiseMinorityCandidatesData.filter(
          (record) => record.year === parseInt(selectedYear[0])
        )}
        tooltipContent={tooltipContent}
        tooltipId={tooltipId}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
      />
      <FactSection
        content={linguisticWiseMinorityCandidates.fact}
      ></FactSection>
      <ChartTooltip tooltipId={tooltipId}>
        <MeritListTooltipContent content={tooltipContent} />
      </ChartTooltip>
    </ChartSection>
  );
};

export default LinguisticWiseMinorityCandidates;
