"use client"
import ChartSection from "@/app/five-year-competition/components/chartSection/ChartSection";
import ChartSectionHeader from "@/app/five-year-competition/components/chartSectionHeader/ChartSectionHeader";
import FactSection from "@/app/five-year-competition/components/factSection/FactSection";
import React, { useState } from "react";
import { clauseAndCategoryWiseCandidates } from "../../content";
import FullScreen from "../../components/fullScreenMeritList/FullScreenMeritList";
import { clauseAndCategoryWiseCandidatesData } from "../../data";
import ChartFilterDropdown from "@/app/five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";
import ClauseAndCategoryWiseCandidatesChart from "../../components/clauseAndCategoryWiseCandidatesChart/ClauseAndCategoryWiseCandidatesChart";


type Props = {};

const ClauseAndCategoryWiseCandidates = (props: Props) => {
  const sectionId = "clauseAndCategoryWiseCandidatesId";

  // years
  const years = Array.from(
    new Set(clauseAndCategoryWiseCandidatesData.map((record) => record.year))
  );

  // states
  const [selectedYear, setSelectedYear] = useState<string[]>([
    Math.max(...years).toString(),
  ]);


  return (
    <ChartSection id={sectionId}>
      <ChartSectionHeader
        title={clauseAndCategoryWiseCandidates.title}
        subtitle={clauseAndCategoryWiseCandidates.subtitle}
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
      <ClauseAndCategoryWiseCandidatesChart
        data={clauseAndCategoryWiseCandidatesData
          .filter((record) => record.year === parseInt(selectedYear[0]))}
      />
      <FactSection content={clauseAndCategoryWiseCandidates.fact}></FactSection>
    </ChartSection>
  );
};

export default ClauseAndCategoryWiseCandidates;
