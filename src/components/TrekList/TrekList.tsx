"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addTrek } from "../../store/slices/trekSlice";
import styles from "./TrekList.module.css";

const TrekList = () => {
  const dispatch = useDispatch();
  const treks = useSelector((state: RootState) => state.trek.treks);

  const handleAddTrek = () => {
    dispatch(
      addTrek({ id: "3", name: "Kilimanjaro", description: "Trek to the top of Africa", price: 1500,level:"easy" })
    );
  };

  return (
    <div className={styles.container}>
      <h2>Treks</h2>
      <ul>
        {treks.map((trek) => (
          <li key={trek.id} className={styles.trekItem}>
            {trek.name} - ${trek.price}- {trek.level}
          </li>
        ))}
      </ul>
      <button onClick={handleAddTrek}>Add Kilimanjaro Trek</button>
    </div>
  );
};

export default TrekList;
