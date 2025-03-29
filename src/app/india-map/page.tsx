"use client";
import React, { useMemo, useState } from "react";
import toolStyles from "../../common/tool/tool-styles.module.css";
import styles from "./styles.module.css";
import ToolHeader from "@/common/tool/toolHeader/ToolHeader";
// import MapFilters from "./components/mapFilters/MapFilters";
import IndiaMap from "./components/indiaMap/IndiaMap";
import Legend from "./components/legend/Legend";
import HomeSvg from "./components/homeSvg/HomeSvg";
import { AnimatePresence } from "framer-motion";
import { CounsellingType, Distributions, Mark, View } from "./types";
import { content } from "./content";
import { rawCollegeData } from "./data";
import {
  getDifferenceForYears,
  getSeats,
  summarizeByInstituteType,
} from "./utils";
import CollegeListCard from "./components/collegeListCard/CollegeListCard";
import OverViewCard from "./components/overViewCard/OverViewCard";
import Compare from "./components/compare/Compare";
import DashboardMap from "./components/dashboardMap/DashboardMap";

type Props = {};

const IndiaMapPage = (props: Props) => {
  // States for main filters. Distribution, InstituteType, States and Years
  const [distributionFilterSelect, setDistributionFilterSelect] =
    useState<string>("Seats");
  const [instituteTypeFilterSelect, setInstituteTypeFilterSelect] = useState<
    string[]
  >([]);
  const [selectedState, setSelectedState] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string[]>(["2024"]);

  const [selectedCollege, setSelectedCollege] = useState<string>("");

  const [counsellingType, setCounsellingType] =
    useState<CounsellingType>("All");

  const views: View[] = ["Absolute View", "Difference View"];
  const [viewFilterSelect, setViewFilterSelect] = useState<View[]>([views[0]]);

  const marks: Mark[] = ["Location View", "Density View"];
  const [markFilterSelect, setMarkFilterSelect] = useState<Mark[]>([marks[0]]);

  // state to lock for free users
  const [isLocked, setIsLocked] = useState<any>(false);

  const preparedDifferenceData = useMemo(() => {
    return getDifferenceForYears(
      rawCollegeData.filter((item) =>
        instituteTypeFilterSelect.length
          ? instituteTypeFilterSelect.includes(item.InstituteType)
          : true
      ),
      [2023, 2024],
      counsellingType
    );
  }, [instituteTypeFilterSelect, counsellingType]);

  const summarizedInstituteTypes = useMemo(() => {
    return summarizeByInstituteType(
      rawCollegeData
        .filter((item) => parseInt(item.Year) === parseInt(selectedYear[0]))
        .filter((item) => {
          if (selectedState[0]) {
            return item.StateName === selectedState[0];
          } else {
            return true;
          }
        }),
      counsellingType
    );
  }, [selectedYear, selectedState, counsellingType]);

  const instituteTypes = useMemo(() => {
    return summarizedInstituteTypes.map((type, index) => {
      return {
        name: type.InstituteType,
        id: `${index}`,
      };
    });
  }, [summarizedInstituteTypes]);

  const filteredCollegeData = useMemo(() => {
    return rawCollegeData
      .filter((college) => {
        return college.StateName === selectedState[0];
      })
      .filter((college) => parseInt(college.Year) === parseInt(selectedYear[0]))
      .filter((college) => {
        if (instituteTypeFilterSelect.length !== 0) {
          return instituteTypeFilterSelect.includes(college.InstituteType);
        } else {
          return true;
        }
      })
      .filter((college) => parseInt(getSeats(college, counsellingType)));
  }, [instituteTypeFilterSelect, selectedState, selectedYear, counsellingType]);

  const filteredCollegeData1 = useMemo(() => {
    return rawCollegeData
      .filter((college) => {
        return selectedState[0] ? college.StateName === selectedState[0] : true;
      })
      .filter((college) => parseInt(college.Year) === parseInt(selectedYear[0]))
      .filter((college) => {
        if (instituteTypeFilterSelect.length !== 0) {
          return instituteTypeFilterSelect.includes(college.InstituteType);
        } else {
          return true;
        }
      })
      .filter((college) => parseInt(getSeats(college, counsellingType)));
  }, [instituteTypeFilterSelect, selectedState, selectedYear, counsellingType]);

  return (
    <div className={toolStyles["tool-container"]}>
      <ToolHeader toolTitle={content.title} toolSubtitle={content.subtitle!} />

      {/* Main filters */}
      {/* <MapFilters
        distributionFilterSelect={distributionFilterSelect}
        setDistributionFilterSelect={setDistributionFilterSelect}
        setIsLocked={setIsLocked}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        instituteTypeFilterSelect={instituteTypeFilterSelect}
        setInstituteTypeFilterSelect={setInstituteTypeFilterSelect}
        instituteTypeFilterData={instituteTypes}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        viewData={views}
        viewFilterSelect={viewFilterSelect}
        setViewFilterSelect={setViewFilterSelect}
        counsellingType={counsellingType}
        setCounsellingType={setCounsellingType}
        marks={marks}
        setMarkFilterSelect={setMarkFilterSelect}
        markFilterSelect={markFilterSelect}
      /> */}

      {/* Map container with legends and home button */}
      <div
        style={{ position: "relative" }}
        className={`${toolStyles["tool-table-container"]}`}
      >
        {/* Home button for Map */}
        <div
          className={styles.svgContainer}
          onClick={() => setSelectedState([""])}
        >
          <HomeSvg />
        </div>

        {/* Legends */}
        <AnimatePresence>{!selectedState.length && <Legend />}</AnimatePresence>

        <div className={styles.mapContainer}>
          {/* Compare Toggle */}
          <AnimatePresence>
            {!selectedState.length && (
              <Compare
                setViewFilterSelect={setViewFilterSelect}
                year={parseInt(selectedYear[0])}
              />
            )}
          </AnimatePresence>
          {/* India Map */}
          <IndiaMap
            selectedState={selectedState[0]}
            setSelectedState={setSelectedState}
            distribution={distributionFilterSelect as Distributions}
            choroplethData={preparedDifferenceData[parseInt(selectedYear[0])]}
            view={viewFilterSelect[0]}
            year={parseInt(selectedYear[0])}
            filteredCollegeData={filteredCollegeData}
            counsellingType={counsellingType}
            setSelectedCollege={setSelectedCollege}
            marksView={
              markFilterSelect[0] === "Location View" ? "location" : "radius"
            }
          />

          {/* side panel */}
          <div className={styles.sidePanelContainer}>
            <OverViewCard
              distributionFilterSelect={distributionFilterSelect}
              setDistributionFilterSelect={setDistributionFilterSelect}
              summarizedInstituteTypes={summarizedInstituteTypes.filter(
                (item) =>
                  instituteTypeFilterSelect.length !== 0
                    ? instituteTypeFilterSelect.includes(item.InstituteType)
                    : true
              )}
            />
            <CollegeListCard
              selectedCollege={selectedCollege}
              filteredCollegeData={filteredCollegeData1}
              counsellingType={counsellingType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMapPage;
