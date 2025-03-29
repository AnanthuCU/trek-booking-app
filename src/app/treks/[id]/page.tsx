"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Trek } from "@/types/trekTypes";
import styles from "./TrekDetails.module.css";
import RouteTable from "../../../components/RouteTable/RouteTable";

const TrekDetails = () => {
  const { id } = useParams(); // ✅ Get trek ID from URL
  const trek = useSelector((state: RootState) =>
    state.treks.list.find((t: Trek) => t.id === Number(id))
  );

  if (!trek) {
    return <p style={{ textAlign: "center" }}>Trek not found!</p>;
  }

  return (
    <div className={styles.trekDetails}>
      <h1>{trek.name}</h1>
      <p>{trek.description}</p>
      <p className={styles.price}>Price: ${trek.price}</p>
      <p>More details about the route will be available here.</p>
      <RouteTable/>
    </div>
  );
};

export default TrekDetails;
