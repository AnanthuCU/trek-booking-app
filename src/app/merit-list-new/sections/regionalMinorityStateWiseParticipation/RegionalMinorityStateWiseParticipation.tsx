"use client";
import ChartSection from "@/app/five-year-competition/components/chartSection/ChartSection";
import ChartSectionHeader from "@/app/five-year-competition/components/chartSectionHeader/ChartSectionHeader";
import FactSection from "@/app/five-year-competition/components/factSection/FactSection";
import React, { useState } from "react";
import { regionalMinorityStateWiseParticipationData } from "../../data";
import ChartFilterDropdown from "@/app/five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";
import { regionalMinorityStateWiseParticipation } from "../../content";
import FullScreen from "../../components/fullScreenMeritList/FullScreenMeritList";
import RegionalMinorityStateWiseParticipationChart from "../../components/regionalMinorityStateWiseParticipationChart/RegionalMinorityStateWiseParticipationChart";

type Props = {};

const RegionalMinorityStateWiseParticipation = (props: Props) => {
  const sectionId = "regionalMinorityStateWiseParticipationId";

  // years
  const years = Array.from(
    new Set(
      regionalMinorityStateWiseParticipationData.map((record) => record.year)
    )
  );

  // states
  const [selectedYear, setSelectedYear] = useState<string[]>([
    Math.max(...years).toString(),
  ]);

  return (
    <ChartSection id={sectionId}>
      <ChartSectionHeader
        title={regionalMinorityStateWiseParticipation.title}
        subtitle={regionalMinorityStateWiseParticipation.subtitle}
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
      <RegionalMinorityStateWiseParticipationChart
        data={regionalMinorityStateWiseParticipationData.filter(
          (record) => record.year === parseInt(selectedYear[0])
        )}
      />
      <FactSection
        content={regionalMinorityStateWiseParticipation.fact}
      ></FactSection>
    </ChartSection>
  );
};

export default RegionalMinorityStateWiseParticipation;
