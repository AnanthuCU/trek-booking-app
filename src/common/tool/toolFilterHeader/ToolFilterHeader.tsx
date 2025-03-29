// import React, { Dispatch, SetStateAction, useContext } from "react";
// import styles from "./ToolFilterHeader.module.css";
// import StateDropdown from "../stateDropdown/StateDropdown";
// import { StateData } from "@/common/tool/sample-response";
// type Props = {
//   selectedState: string;
//   setSelectedState: Dispatch<SetStateAction<string>>;
//   stateData: StateData[];
//   filterTitle: string;
//   filterSubtitle?: string | undefined;
//   isStateRequired?: boolean;
//   setIsLocked: Dispatch<SetStateAction<boolean>>;
//   searchInput?: boolean;
//   displayAccessor?: string;
//   selectAccessor?: string;
//   lockedPlans?: string[];
// };

// const ToolFilterHeader = ({
//   selectedState,
//   setSelectedState,
//   stateData,
//   filterTitle,
//   filterSubtitle,
//   isStateRequired = true,
//   searchInput = true,
//   setIsLocked,
//   selectAccessor = "name",
//   displayAccessor = "name",
//   lockedPlans = ["free"],
// }: Props) => {
//   return (
//     <div className={styles["--pl-filter-header-container"]}>
//       <div className={styles["--pl-filter-pill"]}></div>
//       <div className={styles["--pl-filter-header"]}>
//         <h4 className={styles["--title"]}>{filterTitle}</h4>
//         {filterSubtitle && (
//           <p className={styles["--subtitle"]}>{filterSubtitle}</p>
//         )}
//       </div>
//       <div className={styles["--pl-filter-state"]}>
//         {isStateRequired && (
//           <StateDropdown
//             selectedState={selectedState}
//             setSelectedState={setSelectedState}
//             searchInput={searchInput}
//             stateData={stateData}
//             setIsLocked={setIsLocked}
//             selectAccessor={selectAccessor}
//             displayAccessor={displayAccessor}
//             lockedPlans={lockedPlans}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ToolFilterHeader;
