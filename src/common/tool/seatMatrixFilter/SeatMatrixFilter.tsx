// import React, {
//   Dispatch,
//   SetStateAction,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import styles from "./SeatMatrixFilter.module.css";
// import DropdownSvg from "@/common/tool/svgs/DropdownSvg";
// import TickSvg from "@/common/tool/svgs/TickSvg";
// import CloseSvg from "@/common/tool/svgs/CloseSvg";
// import {
//   calculateSimilarity,
//   getSelectText,
//   levenshteinDistance,
//   textTransform,
// } from "@/common/tool/utils";
// // import { init } from "@/utils/textSearch";
// import ExpandLessSvg from "@/common/tool/svgs/ExpandLessSvg";
// // import {
// //   createInvertedIndex,
// //   createTrie,
// //   generateRankedGroupWordList,
// //   generateWordList,
// //   sortWordFrequencies,
// // } from "@/utils/tools/text-utils";
// import { useSelector } from "react-redux";
// // import { selectSubscriptionPlan } from "@/redux/selectors/auth.selectors";

// export type FilterDataType = {
//   id: string;
//   name: string;
//   __typename?: string;
// };

// type Props = {
//   placeholder: string;
//   filterSelect: string[];
//   setFilterSelect: Dispatch<SetStateAction<string[]>>;
//   filterData: FilterDataType[] | undefined;
//   searchInput: boolean;
//   dynamicFilterData?: string[];
//   multiSelect?: boolean;
//   selectAccessor?: keyof FilterDataType;
//   display?: boolean;
//   setIsLocked: Dispatch<SetStateAction<boolean>>;
//   preserveValue?: boolean;
//   isAllRequired?: boolean;
//   lockedPlans?: string[];
// };

// const SeatMatrixFilter = ({
//   placeholder,
//   filterData,
//   filterSelect,
//   setFilterSelect,
//   searchInput,
//   dynamicFilterData,
//   multiSelect = true,
//   selectAccessor = "name",
//   setIsLocked,
//   preserveValue = false,
//   isAllRequired = false,
//   lockedPlans = ["free"],
// }: Props) => {
//   const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [filterSelectDisplay, setFilterSelectDisplay] = useState<string[]>([]);

//   // const userPlan = useSelector(selectSubscriptionPlan);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const [wordList, setWordList] = useState(new Set());
//   const [invertedIndex, setInvertedIndex] = useState<any>({});
//   // const [trie, setTrie] = useState(createTrie());

//   // useEffect(() => {
//   //   if (isAllRequired) {
//   //     if (!filterData?.find((item) => item.name == "All")) {
//   //       filterData?.unshift({ id: "99999", name: "All" });
//   //     }
//   //   }
//   // }, [isAllRequired, filterData]);

//   // setup
//   useEffect(() => {
//     if (filterData && filterData.length > 0) {
//       const newWordList = new Set<string>();
//       const newInvertedIndex = {};
//       const newTrie = createTrie();

//       generateWordList(filterData, newWordList);
//       createInvertedIndex(newInvertedIndex, filterData);
//       newWordList.forEach((word) => newTrie.insert(word));

//       setWordList(newWordList);
//       setInvertedIndex(newInvertedIndex);
//       setTrie(newTrie);

//       // console.log(newInvertedIndex, "inverted index");
//     }
//   }, [filterData]);
//   // setup complete

//   const getSelectText = (): { text: string; excessNumber: number } => {
//     let spacedFilter = filterSelectDisplay.map((item, index) => {
//       if (index !== 0) {
//         return " " + item;
//       } else {
//         return item;
//       }
//     });
//     let excessNumber = 0;
//     let adder = 0;
//     spacedFilter.map((item, index) => {
//       if ((adder += item.split("").length) >= 32 - index) {
//         excessNumber += 1;
//       }
//     });
//     if (excessNumber) {
//       return {
//         text: `${spacedFilter.toString().slice(0, 31)} ...`,
//         excessNumber,
//       };
//     } else {
//       return {
//         text: `${spacedFilter.toString().slice(0, 31)}`,
//         excessNumber,
//       };
//     }
//   };

//   const handleFilterSelect = (item: string) => {
//     if (item === "All" || item === "99999") {
//       if (!filterSelect.includes("All") && !filterSelect.includes("99999")) {
//         // @ts-ignore
//         const allData: string[] = filterData?.map(
//           (item) => item[selectAccessor]
//         );
//         if (allData) {
//           setFilterSelect(allData);
//         }
//       } else {
//         const newFilterSelect = filterSelect.filter(
//           (item) => item !== "All" && item !== "99999"
//         );
//         const slicedSelect = newFilterSelect.slice(0, 1);
//         console.log(slicedSelect, "sliced select");
//         setFilterSelect(slicedSelect);
//         return;
//       }
//     }
//     if (filterSelect.includes(item)) {
//       // console.log("filter includes if");
//       if (isAllRequired) {
//         const newFilterSelect = filterSelect
//           .filter((oldItem) => oldItem !== item)
//           .filter((oldItem) => oldItem !== "All" && oldItem !== "99999");
//         setFilterSelect(newFilterSelect);
//       } else {
//         if (preserveValue) {
//           if (filterSelect.length > 1) {
//             setFilterSelect((prev) => {
//               return prev.filter((oldItem) => oldItem !== item);
//             });
//           }
//         } else {
//           setFilterSelect((prev) => {
//             return prev.filter((oldItem) => oldItem !== item);
//           });
//         }
//       }
//     } else {
//       if (multiSelect) {
//         setFilterSelect((prev) => [...prev, item]);
//       } else {
//         setFilterSelect([item]);
//         setIsFilterOpen(false);
//       }
//     }
//   };

//   const handleFilterClearClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (preserveValue) {
//       console.log("preserve value");
//       const newFilterSelect = filterSelect.filter(
//         (item) => item !== "All" && item !== "99999"
//       );
//       const slicedSelect = newFilterSelect.slice(0, 1);
//       setFilterSelect(slicedSelect);
//       return;
//     } else {
//       setFilterSelect([]);
//     }
//   };

//   useEffect(() => {
//     if (!isFilterOpen) {
//       setSearchValue("");
//     }
//   }, [searchValue, isFilterOpen]);

//   useEffect(() => {
//     const nameArray: string[] = [];
//     filterSelect.map((id) => {
//       const data = filterData?.find((item: any) => item[selectAccessor] === id);
//       if (data) {
//         nameArray.push(data?.name);
//       }
//       return null;
//     });
//     setFilterSelectDisplay([...nameArray]);
//   }, [filterSelect, filterData, selectAccessor]);

//   const handleFilterClick = (
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     const plan = userPlan;
//     if (lockedPlans.includes(plan)) {
//       event.stopPropagation();
//       setIsLocked(true);
//       // console.log("Filter Locked");
//     } else {
//       setIsFilterOpen((prev) => !prev);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsFilterOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const getCloseSvg = () => {
//     if (preserveValue && filterSelect.length === 1) {
//       if (isFilterOpen) {
//         return (
//           <span className={styles["close-icon"]}>
//             <ExpandLessSvg />
//           </span>
//         );
//       } else {
//         return (
//           <span className={styles["close-icon"]}>
//             <DropdownSvg />
//           </span>
//         );
//       }
//     } else {
//       return (
//         <span
//           className={styles["close-icon-small"]}
//           onClick={handleFilterClearClick}
//         >
//           <CloseSvg />
//         </span>
//       );
//     }
//   };

//   const getFilterDocumentIds = (targetWord: string) => {
//     const targetWordList = generateRankedGroupWordList(
//       wordList,
//       targetWord,
//       trie
//     );

//     const rankedIds: any = {};
//     targetWordList.map((wordGroup: any) => {
//       Object.keys(wordGroup).map((key) => {
//         if (invertedIndex[key]) {
//           invertedIndex[key].map((id: any) => {
//             if (rankedIds[id]) {
//               rankedIds[id] = rankedIds[id] + wordGroup[key];
//             } else {
//               rankedIds[id] = wordGroup[key];
//             }
//           });
//         }
//       });
//     });

//     // console.log(rankedIds, "ranked ids");

//     const sortedWordListFrequencies = sortWordFrequencies(
//       Object.entries(rankedIds)
//     );

//     // console.log(sortedWordListFrequencies, "sorted list");

//     const res = Object.keys(sortedWordListFrequencies).map((id) =>
//       filterData?.find((item) => item.id === id)
//     );

//     return sortedWordListFrequencies;
//   };

//   const [matchedIds, setMatchedIds] = useState<any>([]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(e.target.value);
//     const res = getFilterDocumentIds(e.target.value);
//     const ids = Object.keys(res);
//     setMatchedIds(res);
//   };

//   return (
//     <div
//       className={styles["--pl-filter-relative-container"]}
//       onClick={(e) => {
//         if (!isFilterOpen) {
//           e.stopPropagation();
//         }
//       }}
//       ref={dropdownRef}
//     >
//       <div
//         className={styles["--pl-filter-dd-container"]}
//         onClick={handleFilterClick}
//       >
//         <p className={styles["--title"]}>
//           {filterSelect.length !== 0 ? (
//             <>
//               <span className={styles["--placeholder-active"]}>
//                 {getSelectText().text}
//               </span>
//               <span className={styles["--placeholder-number"]}>
//                 <span
//                   className={styles["close-icon"]}
//                   onClick={handleFilterClearClick}
//                 >
//                   {/* <CloseSvg /> */}
//                   {/* <CancelSvg /> */}
//                 </span>
//                 {getSelectText().excessNumber !== 0
//                   ? `+${getSelectText().excessNumber}`
//                   : ""}
//               </span>
//             </>
//           ) : (
//             placeholder
//           )}
//         </p>
//         {filterSelect.length !== 0 ? (
//           <>{getCloseSvg()}</>
//         ) : isFilterOpen ? (
//           <span className={styles["close-icon"]}>
//             <ExpandLessSvg />
//           </span>
//         ) : (
//           <span className={styles["close-icon"]}>
//             <DropdownSvg />
//           </span>
//         )}
//       </div>
//       {isFilterOpen && (
//         <div className={styles["--pl-filter-dd-dropdown-container"]}>
//           {searchInput && filterData && filterData.length > 0 && (
//             <div className={styles["--pl-filter-dd-search"]}>
//               <input
//                 type="text"
//                 value={searchValue}
//                 onChange={(e) => handleSearchChange(e)}
//                 placeholder="Search by keyword"
//               />
//             </div>
//           )}
//           {filterData
//             ? [...filterData]
//                 ?.sort((a, b) => a.name.localeCompare(b.name))
//                 .filter((item) => {
//                   // console.log(searchValue, "search value");
//                   if (searchValue !== "") {
//                     // logic start
//                     // console.log(matchedIds, "matched ids");
//                     // console.log(item, "item");
//                     const ids = Object.keys(matchedIds);
//                     if (ids.includes(item.id)) {
//                       // console.log("matched record");
//                       return item;
//                     }
//                     // return item;
//                     // logic end
//                   } else {
//                     return item;
//                   }
//                 })
//                 .sort((a, b) => matchedIds[b.id] - matchedIds[a.id])
//                 .map((item: any) => {
//                   return (
//                     <div
//                       className={styles["--filter-item"]}
//                       key={item.id}
//                       onClick={() => handleFilterSelect(item[selectAccessor])}
//                     >
//                       <span
//                         className={
//                           filterSelect.includes(item[selectAccessor])
//                             ? "--pl-icon"
//                             : `--pl-icon ${styles["--inactive"]}`
//                         }
//                       >
//                         <TickSvg />
//                       </span>
//                       <p
//                         className={
//                           dynamicFilterData
//                             ? dynamicFilterData?.includes(item["name"])
//                               ? `${styles["--pl-list-item"]}`
//                               : `${styles["--pl-list-item-disabled"]}`
//                             : `${styles["--pl-list-item"]}`
//                         }
//                       >
//                         {item.name}
//                       </p>
//                     </div>
//                   );
//                 })
//             : ""}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SeatMatrixFilter;
