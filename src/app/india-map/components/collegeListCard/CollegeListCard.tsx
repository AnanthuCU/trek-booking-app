"use client";
import React, { useEffect, useState } from "react";
import styles from "./CollegeListCard.module.css";
import { CounsellingType, RawInstituteData } from "../../types";
import CollegeCard from "../collegeCard/CollegeCard";

type Props = {
  filteredCollegeData: RawInstituteData[];
  counsellingType: CounsellingType;
  selectedCollege: string;
};

const CollegeListCard = ({
  filteredCollegeData,
  counsellingType,
  selectedCollege,
}: Props) => {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    document
      .getElementById(selectedCollege)
      ?.scrollIntoView({ behavior: "smooth" });
  }, [selectedCollege]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        College list ({filteredCollegeData.length})
      </div>
      <div className={styles.searchBar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M15.0258 13.8467L18.5947 17.4156L17.4162 18.5941L13.8473 15.0252C12.5641 16.0518 10.9367 16.666 9.16666 16.666C5.02666 16.666 1.66666 13.306 1.66666 9.16602C1.66666 5.02602 5.02666 1.66602 9.16666 1.66602C13.3067 1.66602 16.6667 5.02602 16.6667 9.16602C16.6667 10.936 16.0525 12.5634 15.0258 13.8467ZM13.3539 13.2283C14.3729 12.1782 15 10.7457 15 9.16602C15 5.9431 12.3896 3.33268 9.16666 3.33268C5.94374 3.33268 3.33332 5.9431 3.33332 9.16602C3.33332 12.3889 5.94374 14.9993 9.16666 14.9993C10.7463 14.9993 12.1788 14.3723 13.229 13.3533L13.3539 13.2283Z"
            fill="#B0B0B0"
          />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className={styles.searchInput}
        />
      </div>
      <div className={styles.collegeCardContainer}>
        {filteredCollegeData
          .sort((a, b) => a.InstituteName.localeCompare(b.InstituteName))
          .filter((item) => {
            if (search !== "") {
              return new RegExp(search, "i").test(item.InstituteName);
            } else {
              return true;
            }
          })
          .map((college, index) => {
            return (
              <CollegeCard
                id={college.InstituteName}
                key={index}
                college={college}
                counsellingType={counsellingType}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CollegeListCard;
