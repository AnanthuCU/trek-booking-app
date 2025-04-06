"use client";
import React, { useMemo, useState } from "react";
import styles from "./DashboardMap.module.css";
import toolStyles from "../../../../common/tool/table-styles.module.css";
import {
  CounsellingType,
  Distributions,
  MapView,
  Mark,
  View,
} from "../../types";
import {
  getDifferenceForYears,
  getSeats,
  summarizeByInstituteType,
} from "../../utils";
import { rawCollegeData } from "../../data";
import HomeSvg from "../homeSvg/HomeSvg";
import IndiaMap from "../indiaMap/IndiaMap";
import OverViewCard from "../overViewCard/OverViewCard";
import ToolFilterHeader from "@/common/tool/toolFilterHeader/ToolFilterHeader";
import { content } from "../../content";
import { useRouter } from "next/navigation";

type Props = {};

const DashboardMap = (props: Props) => {
  // router
  const router = useRouter();
  const collegeAndSeatsLink = "/india-map";

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

  const mapView: MapView = "dashboard";

  const distributionFilterData = [
    { id: "1", name: "All" },
    { id: "2", name: "MCC" },
    { id: "3", name: "State" },
  ];

  // state to lock for free users
  const [isLocked, setIsLocked] = useState<any>(false);

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

  return (
    <div className={`${toolStyles["tool-container"]} `}>
      <div
        className={`${toolStyles["tool-filter-container"]} ${styles.container}`}
      >
        <ToolFilterHeader
          filterTitle={`College and Seats Distribution - ${selectedYear[0]}`}
          // filterTitle={`${distributionFilterSelect} Distribution - ${selectedYear[0]}`}
          filterSubtitle={content.subtitle}
          selectedState={counsellingType as string}
          setSelectedState={
            setCounsellingType as React.Dispatch<React.SetStateAction<string>>
          }
          stateData={distributionFilterData}
          setIsLocked={setIsLocked}
          searchInput={false}
        />

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

          {/* link to the full tool */}
          <div
            className={styles.link}
            onClick={() => router.push(collegeAndSeatsLink)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
            >
              <path
                d="M6.25 4.25V5.5H3.125V12.375H10V9.25H11.25V13C11.25 13.3452 10.9702 13.625 10.625 13.625H2.5C2.15483 13.625 1.875 13.3452 1.875 13V4.875C1.875 4.52982 2.15483 4.25 2.5 4.25H6.25ZM13.125 2.375V7.375H11.875L11.8749 4.50813L7.00444 9.37944L6.12056 8.49556L10.9906 3.625H8.125V2.375H13.125Z"
                fill="#0A9CED"
              />
            </svg>
            <p>View more data on College & Seats </p>
          </div>

          <div className={styles.mapContainer}>
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
              mapView={mapView}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMap;
