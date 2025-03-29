"use client";
import ChartSection from "@/app/five-year-competition/components/chartSection/ChartSection";
import ChartSectionHeader from "@/app/five-year-competition/components/chartSectionHeader/ChartSectionHeader";
import FactSection from "@/app/five-year-competition/components/factSection/FactSection";
import React, { useState } from "react";
import { specialCategoryCandidateParticipation } from "../../content";
import FullScreen from "../../components/fullScreenMeritList/FullScreenMeritList";
import { specialCategoryCandidateParticipationData } from "../../data";
import ChartFilterDropdown from "@/app/five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";
import SpecialCategoryCandidateParticipationChart from "../../components/specialCategoryCandidateParticipationChart/SpecialCategoryCandidateParticipationChart";
import { CategoryData, DataPoint, MeritListTooltip } from "../../types";
import { calculateDifferenceAndPercentage } from "@/app/five-year-competition/utils";
import ChartTooltip from "@/app/five-year-competition/components/chartTooltip/ChartTooltip";
import MeritListTooltipContent from "../../components/meritListTooltipContent/MeritListTooltipContent";

type Props = {};

const SpecialCategoryCandidateParticipation = (props: Props) => {
  const sectionId = "specialCategoryCandidateParticipationId";

  // years
  const years = Array.from(
    new Set(
      specialCategoryCandidateParticipationData.map((record) => record.year)
    )
  );
  // states
  const [selectedYear, setSelectedYear] = useState<string[]>([
    Math.max(...years).toString(),
  ]);

  const tooltipId = "specialCategoryCandidateParticipationChartTooltipId";

  const [tooltipContent, setTooltipContent] = useState<MeritListTooltip>();

  const handleMouseMove = (mouseOverData: DataPoint) => {
    const prevYear = parseInt(selectedYear[0]) - 1;
    const prevYearRecord = specialCategoryCandidateParticipationData.find(
      (record) =>
        record.year === prevYear && record.category === mouseOverData.category
      // && record.state === mouseOverData.state
    );

    if (prevYearRecord) {
      const diff = calculateDifferenceAndPercentage(
        mouseOverData.value,
        prevYearRecord.value
      );
      setTooltipContent({
        year: `${selectedYear[0]}`,
        value: mouseOverData.value,
        column: mouseOverData.category,
        diff: {
          difference: diff.difference,
          percentage: diff.percentage,
          prevYear: `${prevYear}`,
          currentYear: `${selectedYear[0]}`,
        },
      });
    } else {
      setTooltipContent({
        year: `${selectedYear[0]}`,
        value: mouseOverData.value,
        column: mouseOverData.category,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent(undefined);
  };

  return (
    <ChartSection id={sectionId}>
      <ChartSectionHeader
        title={specialCategoryCandidateParticipation.title}
        subtitle={specialCategoryCandidateParticipation.subtitle}
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
      <SpecialCategoryCandidateParticipationChart
        data={specialCategoryCandidateParticipationData.filter(
          (record) => record.year === parseInt(selectedYear[0])
        )}
        tooltipId={tooltipId}
        handleMouseMove={handleMouseMove}
        tooltipContent={tooltipContent}
        handleMouseLeave={handleMouseLeave}
      />
      <FactSection
        content={specialCategoryCandidateParticipation.fact}
      ></FactSection>
      <ChartTooltip tooltipId={tooltipId}>
        <MeritListTooltipContent content={tooltipContent} />
      </ChartTooltip>
    </ChartSection>
  );
};

export default SpecialCategoryCandidateParticipation;
