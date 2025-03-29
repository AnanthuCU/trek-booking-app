"use client";
import ChartSection from "@/app/five-year-competition/components/chartSection/ChartSection";
import ChartSectionHeader from "@/app/five-year-competition/components/chartSectionHeader/ChartSectionHeader";
import React, { useState } from "react";
import { candidatesParticipatedCounselling } from "../../content";
import FactSection from "@/app/five-year-competition/components/factSection/FactSection";
import FullScreen from "../../components/fullScreenMeritList/FullScreenMeritList";
import { candidatesParticipatedCounsellingData } from "../../data";
import ChartFilterDropdown from "@/app/five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";
import CandidatesParticipatedCounsellingChart from "../../components/candidatesParticipatedCounsellingChart/CandidatesParticipatedCounsellingChart";

type Props = {};

const CandidatesParticipatedCounselling = (props: Props) => {
  const sectionId = "candidatesParticipatedCounsellingId";

  //years
  const years = Array.from(
    new Set(candidatesParticipatedCounsellingData.map((record) => record.year))
  );

  const [selectedYear, setSelectedYear] = useState<string[]>([
    Math.max(...years).toString(),
  ]);

  return (
    <ChartSection id={sectionId}>
      <ChartSectionHeader
        title={candidatesParticipatedCounselling.title}
        subtitle={candidatesParticipatedCounselling.subtitle}
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
      <CandidatesParticipatedCounsellingChart
        data={candidatesParticipatedCounsellingData.filter(
          (record) => record.year === parseInt(selectedYear[0])
        )}
      />
      <FactSection
        content={candidatesParticipatedCounselling.fact}
      ></FactSection>
    </ChartSection>
  );
};

export default CandidatesParticipatedCounselling;
