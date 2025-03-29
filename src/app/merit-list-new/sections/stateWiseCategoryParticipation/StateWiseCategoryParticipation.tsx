"use client";
import ChartSection from "@/app/five-year-competition/components/chartSection/ChartSection";
import ChartSectionHeader from "@/app/five-year-competition/components/chartSectionHeader/ChartSectionHeader";
import FactSection from "@/app/five-year-competition/components/factSection/FactSection";
import React, { useState } from "react";
import { stateWiseCategoryParticipation } from "../../content";
import FullScreen from "../../components/fullScreenMeritList/FullScreenMeritList";
import { stateWiseCategoryParticipationData } from "../../data";
import ChartFilterDropdown from "@/app/five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";
import StateWiseCategoryParticipationChart from "../../components/stateWiseCategoryParticipationChart/StateWiseCategoryParticipationChart";
import ChartTooltip from "@/app/five-year-competition/components/chartTooltip/ChartTooltip";
import { CategoryData, MeritListTooltip } from "../../types";
import { calculateDifferenceAndPercentage } from "@/app/five-year-competition/utils";
import MeritListTooltipContent from "../../components/meritListTooltipContent/MeritListTooltipContent";

type Props = {};

const StateWiseCategoryParticipation = (props: Props) => {
  const sectionId = "stateWiseCategoryParticipationId";
  const tooltipId = "stateWiseCategoryParticipationTooltipId";

  // years
  const years = Array.from(
    new Set(stateWiseCategoryParticipationData.map((record) => record.year))
  );
  // categories
  const categories = Array.from(
    new Set(stateWiseCategoryParticipationData.map((record) => record.category))
  );

  // states
  const [selectedYear, setSelectedYear] = useState<string[]>([
    Math.max(...years).toString(),
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([
    "All",
    ...categories,
  ]);

  const [tooltipContent, setTooltipContent] = useState<MeritListTooltip>();

  const handleMouseMove = (mouseOverData: CategoryData) => {
    const prevYear = mouseOverData.year - 1;
    const prevYearRecord = stateWiseCategoryParticipationData.find(
      (record) =>
        record.year === prevYear &&
        record.category === mouseOverData.category &&
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
        column: mouseOverData.category,
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
        title={stateWiseCategoryParticipation.title}
        subtitle={stateWiseCategoryParticipation.subtitle}
      >
        <ChartFilterDropdown
          title={"Year"}
          data={years.map((item) => `${item}`)}
          selected={selectedYear}
          setSelected={setSelectedYear}
          isMultiSelect={false}
        />
        <ChartFilterDropdown
          title={"Categories"}
          data={["All", ...categories]}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <FullScreen sectionId={sectionId} />
      </ChartSectionHeader>
      <StateWiseCategoryParticipationChart
        data={stateWiseCategoryParticipationData
          .filter((record) => record.year === parseInt(selectedYear[0]))
          .filter((record) => selectedCategory.includes(record.category))
          .sort((record1, record2) => record2.value - record1.value)}
        tooltipId={tooltipId}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
        tooltipContent={tooltipContent}
      />
      <FactSection content={stateWiseCategoryParticipation.fact}></FactSection>
      <ChartTooltip tooltipId={tooltipId}>
        <MeritListTooltipContent content={tooltipContent} />
      </ChartTooltip>
    </ChartSection>
  );
};

export default StateWiseCategoryParticipation;
