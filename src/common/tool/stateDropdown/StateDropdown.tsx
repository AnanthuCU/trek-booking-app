// import React, {
//   Dispatch,
//   SetStateAction,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import styles from "./StateDropdown.module.css";
// import DropdownFilledSvg from "@/common/tool/svgs/DropdownFilledSvg";
// import TickSvg from "@/common/tool/svgs/TickSvg";
// import DropdownFilledCloseSvg from "../svgs/DropdownFilledCloseSvg";
// import { useSelector } from "react-redux";
// import { selectSubscriptionPlan } from "@/redux/selectors/auth.selectors";

// export type StateType = any;

// // export type StateType = {
// //   id: string;
// //   name: string;
// // };

// type Props = {
//   selectedState: string;
//   setSelectedState: Dispatch<SetStateAction<string>>;
//   searchInput: boolean;
//   stateData: StateType[];
//   setIsLocked: Dispatch<SetStateAction<boolean>>;
//   displayAccessor?: string;
//   selectAccessor?: string;
//   lockedPlans?: string[];
// };

// const StateDropdown = ({
//   selectedState,
//   setSelectedState,
//   searchInput,
//   stateData,
//   setIsLocked,
//   selectAccessor = "name",
//   displayAccessor = "name",
//   lockedPlans = ["free"],
// }: Props) => {
//   const [isStateFilterOpen, setIsStateFilterOpen] = useState<boolean>(false);
//   const [searchValue, setSearchValue] = useState("");

//   const userPlan = useSelector(selectSubscriptionPlan);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleStateSelect = (item: string) => {
//     setSelectedState(item);
//     setIsStateFilterOpen(false);
//   };

//   useEffect(() => {
//     if (!isStateFilterOpen) {
//       setSearchValue("");
//     }
//   }, [searchValue, isStateFilterOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsStateFilterOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className={styles["--pl-state-relative-container"]}
//       // onClick={() => setIsStateFilterOpen((prev) => !prev)}
//       ref={dropdownRef}
//     >
//       <div
//         className={styles["--pl-state-dropdown-container"]}
//         onClick={() => {
//           const plan = userPlan;
//           if (lockedPlans.includes(plan)) {
//             setIsLocked(true);
//           } else {
//             setIsStateFilterOpen((prev) => !prev);
//           }
//         }}
//       >
//         <p className={styles["--title"]}>{selectedState}</p>
//         <span className={styles["--pl-icon"]}>
//           {isStateFilterOpen ? (
//             <DropdownFilledCloseSvg />
//           ) : (
//             <DropdownFilledSvg />
//           )}
//         </span>
//       </div>
//       {isStateFilterOpen && (
//         <div className={styles["--pl-filter-dd-dropdown-container"]}>
//           {searchInput && (
//             <div className={styles["--pl-filter-dd-search"]}>
//               <input
//                 type="text"
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 placeholder="Search"
//               />
//             </div>
//           )}
//           {stateData
//             ?.filter((item) => {
//               if (searchValue !== "") {
//                 let pattern = new RegExp(searchValue, "gi");
//                 if (item.name.match(pattern)) {
//                   return item;
//                 }
//               } else {
//                 return item;
//               }
//             })
//             ?.map((item) => {
//               return (
//                 <div
//                   className={styles["--filter-item"]}
//                   key={item.id}
//                   onClick={() => handleStateSelect(item[displayAccessor])}
//                 >
//                   <span
//                     className={
//                       selectedState === item[displayAccessor]
//                         ? "--pl-icon"
//                         : `--pl-icon ${styles["--inactive"]}`
//                     }
//                   >
//                     <TickSvg />
//                   </span>
//                   <p className={styles["--pl-list-item"]}>
//                     {item[displayAccessor]}
//                   </p>
//                 </div>
//               );
//             })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StateDropdown;
