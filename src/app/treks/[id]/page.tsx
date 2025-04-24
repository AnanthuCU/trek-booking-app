"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Trek } from "@/types/trekTypes";
import RouteTable from "../[id]/components/RouteTable/RouteTable";
import LineChart from "../[id]/components/ElevationChart/LineChart";
import { useState } from "react";
import styles from "./TrekDetails.module.css";

const TrekDetails = () => {
  const { id } = useParams();
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null);

  const trek = useSelector((state: RootState) =>
    state.treks.list.find((t: Trek) => t.id === Number(id))
  );

  if (!trek || !trek.route || trek.route.length === 0) {
    return (
      <p style={{ textAlign: "center" }}>Trek not found or has no route!</p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>{trek.name}</h1>

      <div className={styles.toolsContainer}>
        <div className={styles.tableContainer}>
          {/* Route Table with hover sync */}
          <RouteTable
            route={trek.route}
            hoveredPointId={hoveredPointId}
            setHoveredPointId={setHoveredPointId}
          />
        </div>

        <div className={styles.firstDoubleContainer}>
          <div className={styles.lineChartContainer}>
            {/* Elevation Line Chart with hover sync */}
            <LineChart
              route={trek.route}
              hoveredPointId={hoveredPointId}
              setHoveredPointId={setHoveredPointId}
            />
          </div>

          <div className={styles.mapContainer}>
            <h4>map container</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetails;
