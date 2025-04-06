import React from "react";
import toolStyles from "../../../../common/tool/tool-styles.module.css";
import ToolFilterHeader from "@/common/tool/toolFilterHeader/ToolFilterHeader";
import SeatMatrixFilter from "@/common/tool/seatMatrixFilter/SeatMatrixFilter";
import { getStatesFromMapData } from "../../utils";
import { content } from "../../content";
import { CounsellingType, View } from "../../types";

type Props = {
  distributionFilterSelect: string;
  setDistributionFilterSelect: React.Dispatch<React.SetStateAction<string>>;
  counsellingType: CounsellingType;
  setCounsellingType: React.Dispatch<React.SetStateAction<CounsellingType>>;
  setIsLocked: React.Dispatch<any>;
  selectedState: string[];
  setSelectedState: React.Dispatch<React.SetStateAction<string[]>>;
  instituteTypeFilterSelect: string[];
  setInstituteTypeFilterSelect: React.Dispatch<React.SetStateAction<string[]>>;
  selectedYear: string[];
  setSelectedYear: React.Dispatch<React.SetStateAction<string[]>>;
  instituteTypeFilterData: { name: string; id: string }[];
  viewData: string[];
  viewFilterSelect: View[];
  setViewFilterSelect: React.Dispatch<React.SetStateAction<View[]>>;
};

// const distributionFilterData = [
//   { id: "1", name: "Seats" },
//   { id: "2", name: "Colleges" },
// ];

const distributionFilterData = [
  { id: "1", name: "All" },
  { id: "2", name: "MCC" },
  { id: "3", name: "State" },
];

const yearFilterData = [
  { id: "1", name: "2023" },
  { id: "2", name: "2024" },
];

// states filter data
const preparedStateData = getStatesFromMapData();

const DashboardMapFilters = ({
  distributionFilterSelect,
  setDistributionFilterSelect,
  setIsLocked,
  selectedState,
  setSelectedState,
  instituteTypeFilterSelect,
  setInstituteTypeFilterSelect,
  selectedYear,
  setSelectedYear,
  instituteTypeFilterData,
  viewData,
  counsellingType,
  setCounsellingType,
}: // viewFilterSelect,
// setViewFilterSelect,
Props) => {
  const views = viewData.map((item, index) => {
    return {
      name: item,
      id: `${index}`,
    };
  });

  return (
    <div className={toolStyles["tool-filter-container"]}>
      <ToolFilterHeader
        filterTitle={`${distributionFilterSelect} Distribution - ${selectedYear[0]}`}
        filterSubtitle={content.subtitle}
        selectedState={counsellingType as string}
        setSelectedState={
          setCounsellingType as React.Dispatch<React.SetStateAction<string>>
        }
        stateData={distributionFilterData}
        setIsLocked={setIsLocked}
        searchInput={false}
      />

      {/* <div className={toolStyles["dropdown-filter-container"]}>
        <SeatMatrixFilter
          placeholder="Select State"
          filterSelect={selectedState}
          setFilterSelect={setSelectedState}
          filterData={preparedStateData}
          searchInput={preparedStateData.length > 5}
          setIsLocked={setIsLocked}
          multiSelect={false}
          preserveValue={true}
          isAllRequired={false}
        />

        <SeatMatrixFilter
          placeholder="Select Institute Type"
          filterSelect={instituteTypeFilterSelect}
          setFilterSelect={setInstituteTypeFilterSelect}
          filterData={instituteTypeFilterData}
          searchInput={instituteTypeFilterData.length > 5}
          setIsLocked={setIsLocked}
        />
        <SeatMatrixFilter
          placeholder="Select Year"
          filterSelect={selectedYear}
          setFilterSelect={setSelectedYear}
          filterData={yearFilterData}
          searchInput={yearFilterData.length > 5}
          setIsLocked={setIsLocked}
          multiSelect={false}
          preserveValue={true}
          isAllRequired={false}
        />
      </div> */}
    </div>
  );
};

export default DashboardMapFilters;
