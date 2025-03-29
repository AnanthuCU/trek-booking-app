"use client";
import ChartSection from "@/app/five-year-competition/components/chartSection/ChartSection";
import ChartSectionHeader from "@/app/five-year-competition/components/chartSectionHeader/ChartSectionHeader";
import React, { useEffect, useState } from "react";
import { eligibilityByRankAndMarksRange } from "../../content";
import FactSection from "@/app/five-year-competition/components/factSection/FactSection";
import FullScreen from "../../components/fullScreenMeritList/FullScreenMeritList";
import { eligibilityByRankAndMarksRangeData } from "../../data";
import ChartFilterDropdown from "@/app/five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";
import EligibilityByRankAndMarksRangeDataChart from "../../components/eligibilityByRankAndMarksRangeData/EligibilityByRankAndMarksRangeDataChart";
import SearchComponent from "../../components/SearchComponents/SearchComponent";
import ChartTooltip from "@/app/five-year-competition/components/chartTooltip/ChartTooltip";
import Tooltip from "../../components/tooltip/Tooltip";

type Props = {};

const EligibilityByRankAndMarksRange = (props: Props) => {
  const sectionId = "eligibilityByRankAndMarksRangeId";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // years
  const years = Array.from(
    new Set(eligibilityByRankAndMarksRangeData.map((record) => record.year))
  );
  // states
  const [selectedYear, setSelectedYear] = useState<string[]>([
    Math.max(...years).toString(),
  ]);

  const [search, setSearch] = useState<number>(0);
  const [chartSearchValue, setChartSearch] = useState<string | number>(0);

  const handleSearch = (e:any) => {
    e.preventDefault()
    setChartSearch(search);
  };

  return (
    <ChartSection id={sectionId}>
      <ChartSectionHeader
        title={eligibilityByRankAndMarksRange.title}
        subtitle={eligibilityByRankAndMarksRange.subtitle}
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
      <SearchComponent
        inputType="number"
        placeHolder="eg.360"
        searchText="Search"
        title="Enter your NEET Score"
        value={search}
        setSearch={setSearch}
        search={search}
        handleSearch={handleSearch}
        setChartSearch={setChartSearch}
        min={0}
        max={720}
      />

      <EligibilityByRankAndMarksRangeDataChart
        searchValue={chartSearchValue}
        isMobile={isMobile}
        data={eligibilityByRankAndMarksRangeData.filter(
          (record) => record.year === parseInt(selectedYear[0])
        )}
      />
      <FactSection content={eligibilityByRankAndMarksRange.fact}></FactSection>
    </ChartSection>
  );
};

export default EligibilityByRankAndMarksRange;
