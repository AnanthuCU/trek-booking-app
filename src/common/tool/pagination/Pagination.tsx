import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Pagination.module.css";
import DropdownSvg from "@/common/tool/svgs/DropdownSvg";
import RightArrowSvg from "@/common/tool/svgs/RightArrowSvg";
import LeftArrowSvg from "@/common/tool/svgs/LeftArrowSvg";
import TickSvg from "@/common/tool/svgs/TickSvg";
import ExpandLessSvg from "../svgs/ExpandLessSvg";
import { useSelector } from "react-redux";
import { selectSubscriptionPlan } from "@/redux/selectors/auth.selectors";

type Props = {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  itemsInCurrentPage: number;
  setIsLocked: Dispatch<SetStateAction<boolean>>;
  lockedPlans?: string[];
};

const Pagination = ({
  limit,
  currentPage,
  totalPages,
  setLimit,
  setCurrentPage,
  totalRecords,
  itemsInCurrentPage,
  setIsLocked,
  lockedPlans = ["free"],
}: Props) => {
  const userPlan = useSelector(selectSubscriptionPlan);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [pageInputValue, setPageInputValue] = useState<string>("");
  const presetPageLimits = [10, 15, 20, 30];

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePageSelect = (limit: number) => {
    setLimit(limit);
    setIsSelectOpen(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (pageInputValue !== "" && parseInt(pageInputValue)) {
        let newLimit = Math.abs(parseInt(pageInputValue));
        setLimit(newLimit);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["pagination-container"]}>
      <div
        ref={dropdownRef}
        className={styles["page-container"]}
        onClick={() => {
          const plan = userPlan;
          if (lockedPlans.includes(plan)) {
            // console.log("Locked");
            setIsLocked(true);
          } else {
            setIsSelectOpen((prev) => !prev);
          }
        }}
      >
        <p className={styles["page-title"]}>{`${limit} per page`}</p>
        <span className={styles["--pl-icon"]}>
          {isSelectOpen ? <ExpandLessSvg /> : <DropdownSvg />}
        </span>
        {isSelectOpen && (
          <div
            className={styles["select-container"]}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="number"
              className={styles["page-input"]}
              onKeyDown={(e) => handleInputKeyDown(e)}
              value={pageInputValue}
              onChange={(e) => setPageInputValue(e.target.value)}
            />
            {!presetPageLimits.includes(limit) && (
              <div
                className={styles["--filter-item"]}
                onClick={() => handlePageSelect(limit)}
              >
                <div
                  className={
                    limit === limit
                      ? styles["--page-icon"]
                      : `${styles["--page-icon"]} ${styles["--inactive"]}`
                  }
                >
                  <TickSvg />
                </div>
                <p className={styles["--pl-list-item"]}>{limit}</p>
              </div>
            )}
            {presetPageLimits.map((item, index) => {
              return (
                <div
                  className={styles["--filter-item"]}
                  key={index}
                  onClick={() => handlePageSelect(item)}
                >
                  <span
                    className={
                      limit === item
                        ? styles["--page-icon"]
                        : `${styles["--page-icon"]} ${styles["--inactive"]}`
                    }
                  >
                    <TickSvg />
                  </span>
                  <p className={styles["--pl-list-item"]}>{item}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles["actions-container"]}>
        <p className={styles["page-title"]}>{`${
          1 + (currentPage - 1) * limit
        } - ${
          (currentPage - 1) * limit + itemsInCurrentPage
        } of ${totalRecords}`}</p>
        <span
          className={
            currentPage === 1
              ? `${styles["--pl-icon-inactive"]}`
              : `${styles["--pl-icon"]}`
          }
          onClick={() => {
            const plan = userPlan;
            if (lockedPlans.includes(plan)) {
              // console.log("Locked");
              setIsLocked(true);
            } else {
              setCurrentPage((prev: number) => prev - 1);
            }
          }}
        >
          <LeftArrowSvg />
        </span>
        <span
          className={
            currentPage === totalPages
              ? `${styles["--pl-icon-inactive"]}`
              : `${styles["--pl-icon"]}`
          }
          onClick={() => {
            const plan = userPlan;
            if (lockedPlans.includes(plan)) {
              // console.log("Locked");
              setIsLocked(true);
            } else {
              setCurrentPage((prev: number) => prev + 1);
            }
          }}
        >
          <RightArrowSvg />
        </span>
      </div>
    </div>
  );
};

export default Pagination;
