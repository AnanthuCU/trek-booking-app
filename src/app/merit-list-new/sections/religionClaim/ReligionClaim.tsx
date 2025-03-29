"use client"
import ChartSection from "@/app/five-year-competition/components/chartSection/ChartSection";
import ChartSectionHeader from "@/app/five-year-competition/components/chartSectionHeader/ChartSectionHeader";
import FactSection from "@/app/five-year-competition/components/factSection/FactSection";
import React, { useEffect, useState } from "react";
import { religionClaim } from "../../content";
import FullScreen from "../../components/fullScreenMeritList/FullScreenMeritList";
import ChartFilterDropdown from "@/app/five-year-competition/components/chartFilterDropdown/ChartFilterDropdown";
import { religionClaimData } from "../../data";
import ReligionClaimChart from "../../components/religionClaimChart/ReligionClaimChart";
import ReligionClaimTable from "../../components/religionClaimTable/ReligionClaimTable";
import styles from "./religionClaim.module.css"
import ChartTooltip from "@/app/five-year-competition/components/chartTooltip/ChartTooltip";
import Tooltip from "../../components/tooltip/Tooltip";


type Props = {};

const ReligionClaim = (props: Props) => {
  const sectionId = "religionClaimId";

  // years
  const years = Array.from(
    new Set(religionClaimData.map((record) => record.year))
  );
  // states
  const [selectedYear, setSelectedYear] = useState<string[]>([
    Math.max(...years).toString(),
  ]);

  // const activeColors = [
  //   '#FAA2A2',
  //   '#FFDCA1',
  //   '#AAF2FF',
  //   '#DFD3FF',
  // ];

  // const colors = [
  //   '#FE8484',
  //   '#FFB435',
  //   '#40CEE6',
  //   '#A383FF',
  // ];
  // const [activeRowValue, setActiveRowValue] = useState<null | string>(null)

  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 769);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 769);
  //   };

  //   // Attach the event listener
  //   window.addEventListener('resize', handleResize);

  //   // Cleanup the event listener on unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // const tooltipId = "religionClaimTooltipId";

  // const [chartInfo, setChartInfo] = useState<any>({})


  // const handleMouseOverData = (data: any) => {
  //   setActiveRowValue(data["category"])
  //   let obj: { comparison: null | number, diff: null | number, year?: number | null } = { comparison: null, diff: null, year: null };
  //   obj.year = parseInt(selectedYear[0]);
  //   if (parseInt(selectedYear[0]) === 2021) {
  //     let obj2 = religionClaimData.filter((record) => record?.year === 2020 && record.religion === data.category)
  //     console.log(obj2)
  //     if(obj2.length){

  //       let diff =  data?.value - obj2[0]?.value;
  //       let per = Math.round((diff / data?.value) * 100);
  //       obj.comparison = per;
  //       obj.diff = diff;
  //     }
   
  //   }
  //   setChartInfo((prev: any) => ({ ...prev,...data, ...obj }));
  //   console.log(chartInfo)
  // }

  return (
    <ChartSection id={sectionId}>
      <ChartSectionHeader
        title={religionClaim.title}
        subtitle={religionClaim.subtitle}
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
      <div className={styles.chartComponentContainer}>
        <ReligionClaimChart
          // setActiveRowValue={setActiveRowValue}
          data={religionClaimData
            .filter((record) => record.year === parseInt(selectedYear[0]))}
          // tooltipId={tooltipId}
          // handleMouseOverData={handleMouseOverData}
          selectedYear={parseInt(selectedYear[0])}
        />
        {/* {
          !isMobile ?
            <ReligionClaimTable data={religionClaimData
              .filter((record) => record.year === parseInt(selectedYear[0]))}
              colors={colors}
              activeColors={activeColors}
              activeRowValue={activeRowValue}
            /> : ""
        } */}
      </div>
      <FactSection content={religionClaim.fact}></FactSection>
      {/* <ChartTooltip tooltipId={tooltipId}>
        <Tooltip chartInfo={chartInfo} />
      </ChartTooltip> */}
    </ChartSection>
  );
};

export default ReligionClaim;
