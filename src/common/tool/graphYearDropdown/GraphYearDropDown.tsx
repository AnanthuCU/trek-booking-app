import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./GraphYearDropDown.module.css";
import DropdownFilledSvg from "@/common/tool/svgs/DropdownFilledSvg";
import TickSvg from "@/common/tool/svgs/TickSvg";
import DropdownFilledCloseSvg from "../svgs/DropdownFilledCloseSvg";
import { useSelector } from "react-redux";
import { selectSubscriptionPlan } from "@/redux/selectors/auth.selectors";

export type StateType = {
  id: string;
  name: string;
};

type Props = {
  selectedState: string[];
  setSelectedState: Dispatch<SetStateAction<string[]>>;
  searchInput: boolean;
  stateData: StateType[];
  setIsLocked: Dispatch<SetStateAction<boolean>>;
};

const GraphYearDropDown = ({
  selectedState,
  setSelectedState,
  searchInput,
  stateData,
  setIsLocked,
}: Props) => {
  const [isStateFilterOpen, setIsStateFilterOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  const plan = useSelector(selectSubscriptionPlan);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleStateSelect = (item: string) => {
    let prevArray = selectedState;
    if (prevArray.includes(item)) {
      if (prevArray.length > 1) {
        prevArray = prevArray.filter((year) => year !== item);
      }
    } else {
      prevArray.push(item);
    }
    if (prevArray.length > 2) prevArray.shift();

    setSelectedState([...prevArray]);
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

  return (
    <div
      className={styles["--pl-state-relative-container"]}
      // onClick={() => setIsStateFilterOpen((prev) => !prev)}
      ref={dropdownRef}
    >
      <div
        className={styles["--pl-state-dropdown-container"]}
        onClick={() => {
          if (plan === "free") {
            setIsLocked(true);
          } else {
            setIsStateFilterOpen((prev) => !prev);
          }
        }}
      >
        <p className={styles["--title"]}>{selectedState.toString()}</p>
        <span className={styles["--pl-icon"]}>
          {isStateFilterOpen ? (
            <DropdownFilledCloseSvg />
          ) : (
            <DropdownFilledSvg />
          )}
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
            .filter((item) => {
              if (searchValue !== "") {
                let pattern = new RegExp(searchValue, "gi");
                if (item.name.match(pattern)) {
                  return item;
                }
              } else {
                return item;
              }
            })
            .map((item) => {
              return (
                <div
                  className={styles["--filter-item"]}
                  key={item.id}
                  onClick={() => handleStateSelect(item.name)}
                >
                  <span
                    className={
                      selectedState.includes(item.name)
                        ? "--pl-icon"
                        : `--pl-icon ${styles["--inactive"]}`
                    }
                  >
                    <TickSvg />
                  </span>
                  <p className={styles["--pl-list-item"]}>{item.name}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default GraphYearDropDown;
