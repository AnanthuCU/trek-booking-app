"use client";
import React, { useState } from "react";
import styles from "./style.module.css";
import PageHeader from "../five-year-competition/components/pageHeader/PageHeader";
import { meritListPageHeader } from "./content";
import CandidatesParticipatedCounselling from "./sections/candidatesParticipatedCounselling/CandidatesParticipatedCounselling";
import EligibilityByRankAndMarksRange from "./sections/eligibilityByRankAndMarksRange/EligibilityByRankAndMarksRange";
import ClauseAndCategoryWiseCandidates from "./sections/clauseAndCategoryWiseCandidates/ClauseAndCategoryWiseCandidates";
import StateWiseCategoryParticipation from "./sections/stateWiseCategoryParticipation/StateWiseCategoryParticipation";
import LinguisticWiseMinorityCandidates from "./sections/linguisticWiseMinorityCandidates/LinguisticWiseMinorityCandidates";
import SpecialCategoryCandidateParticipation from "./sections/specialCategoryCandidateParticipation/SpecialCategoryCandidateParticipation";
import ReligionClaim from "./sections/religionClaim/ReligionClaim";
import RegionalMinorityStateWiseParticipation from "./sections/regionalMinorityStateWiseParticipation/RegionalMinorityStateWiseParticipation";
import { getStatesFromMeritListData } from "./utils";
import useWindowSize from "./hooks/useWindowSize";
import ChartFilterDropdown from "../five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";

type Props = {};

const page = (props: Props) => {
  const states = getStatesFromMeritListData();
  const windowDimensions = useWindowSize();
  const [selectedState, setSelectedState] = useState(["Karnataka"]);

  return (
    <div className={styles["page-container"]}>
      <div className={styles.header} id="merit-list-header">
        <PageHeader
          title={meritListPageHeader.title}
          subtitle={
            windowDimensions.width > 480
              ? meritListPageHeader.subtitle
              : undefined
          }
        />
        <ChartFilterDropdown
          data={states}
          selected={selectedState}
          setSelected={setSelectedState}
          preserveSelect={true}
        />
      </div>
      <CandidatesParticipatedCounselling />
      <EligibilityByRankAndMarksRange />
      <ClauseAndCategoryWiseCandidates />
      <StateWiseCategoryParticipation />
      <LinguisticWiseMinorityCandidates />
      <SpecialCategoryCandidateParticipation />
      <ReligionClaim />
      <RegionalMinorityStateWiseParticipation />
    </div>
  );
};

export default page;
