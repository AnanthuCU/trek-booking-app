// components/RouteTable/RouteTable.tsx
"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Trek } from "@/types/trekTypes";
import styles from "./RouteTable.module.css"


const RouteTable = () => {
  const { id } = useParams();

  const trek = useSelector((state: RootState) =>
    state.treks.list.find((t: Trek) => t.id === Number(id))
  );

  if (!trek || !trek.route || trek.route.length === 0) {
    return <p style={{ textAlign: "center" }}>Trek not found or has no route!</p>;
  }

  return (
    <div className={styles.routeTable}>
      <h2>Route Information</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Elevation (m)</th>
          </tr>
        </thead>
        <tbody>
          {trek.route.map((point) => (
            <tr
              key={point.id}
            >
              <td>{point.id}</td>
              <td>{point.latitude}</td>
              <td>{point.longitude}</td>
              <td>{point.elevation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteTable;
