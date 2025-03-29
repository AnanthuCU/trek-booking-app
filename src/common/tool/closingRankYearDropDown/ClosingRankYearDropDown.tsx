import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./ClosingRankYearDropDown.module.css";
import TickSvg from "@/common/tool/svgs/TickSvg";
import { useSelector } from "react-redux";
import { selectSubscriptionPlan } from "@/redux/selectors/auth.selectors";
import ChevronDownSvg from "@/utils/svgs/tools/ChevronDownSvg";
import ChevronUpSvg from "@/utils/svgs/tools/ChevronUpSvg";

export type StateType = any;

type Props = {
  selectedState: string;
  setSelectedState: Dispatch<SetStateAction<string>>;
  searchInput: boolean;
  stateData: StateType[];
  setIsLocked: Dispatch<SetStateAction<boolean>>;
  displayAccessor?: string;
  selectAccessor?: string;
  lockedPlans?: string[];
  legendColor: string;
  inActiveElement: string;
};

const ClosingRankYearDropDown = ({
  selectedState,
  setSelectedState,
  searchInput,
  stateData,
  setIsLocked,
  selectAccessor = "name",
  displayAccessor = "name",
  lockedPlans = ["free"],
  legendColor,
  inActiveElement,
}: Props) => {
  const [isStateFilterOpen, setIsStateFilterOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  const userPlan = useSelector(selectSubscriptionPlan);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStateSelect = (item: string) => {
    setSelectedState(item);
    setIsStateFilterOpen(false);
  };

  useEffect(() => {
    if (!isStateFilterOpen) {
      setSearchValue("");
    }
  }, [searchValue, isStateFilterOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsStateFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles["--pl-state-relative-container"]}
      // onClick={() => setIsStateFilterOpen((prev) => !prev)}
      ref={dropdownRef}
    >
      <div
        className={styles["--pl-state-dropdown-container"]}
        onClick={() => {
          const plan = userPlan;
          if (lockedPlans.includes(plan)) {
            setIsLocked(true);
          } else {
            setIsStateFilterOpen((prev) => !prev);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderColor: isHovered ? legendColor : "#b0b0b0",
        }}
      >
        <div
          style={{ backgroundColor: legendColor }}
          className={styles["--legend"]}
        ></div>
        <p className={styles["--title"]}>{selectedState}</p>
        <span className={styles["--pl-icon"]}>
          {isStateFilterOpen ? <ChevronUpSvg /> : <ChevronDownSvg />}
        </span>
      </div>
      {isStateFilterOpen && (
        <div className={styles["--pl-filter-dd-dropdown-container"]}>
          {searchInput && (
            <div className={styles["--pl-filter-dd-search"]}>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
              />
            </div>
          )}
          {stateData
            ?.filter((item) => {
              if (searchValue !== "") {
                let pattern = new RegExp(searchValue, "gi");
                if (item.name.match(pattern)) {
                  return item;
                }
              } else {
                return item;
              }
            })
            ?.map((item) => {
              return (
                <div
                  className={styles["--filter-item"]}
                  key={item.id}
                  onClick={() => handleStateSelect(item[displayAccessor])}
                  style={{
                    backgroundColor:
                      selectedState === item[displayAccessor] ? "#DFF0FF" : "",
                    pointerEvents:
                      inActiveElement === item[displayAccessor]
                        ? "none"
                        : "all",
                  }}
                >
                  <span
                    className={
                      selectedState === item[displayAccessor]
                        ? "--pl-icon"
                        : `--pl-icon ${styles["--inactive"]}`
                    }
                  >
                    <TickSvg />
                  </span>
                  <p
                    className={styles["--pl-list-item"]}
                    style={{
                      color:
                        inActiveElement === item[displayAccessor]
                          ? "#D1D1D1"
                          : "#888888",
                    }}
                  >
                    {item[displayAccessor]}
                  </p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ClosingRankYearDropDown;
