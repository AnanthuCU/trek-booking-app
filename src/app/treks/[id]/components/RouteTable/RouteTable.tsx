import React from "react";
import styles from "./RouteTable.module.css";
import { RoutePoint } from "@/types/trekTypes";

type Props = {
  route: RoutePoint[];
  hoveredPointId: number | null;
  setHoveredPointId: (id: number | null) => void;
};

const RouteTable = ({ route, hoveredPointId, setHoveredPointId }: Props) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Point</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Elevation (m)</th>
        </tr>
      </thead>
      <tbody>
        {route.map((point, index) => (
          <tr
            key={point.id}
            className={
              hoveredPointId === point.id ? styles.highlight : undefined
            }
            onMouseEnter={() => setHoveredPointId(point.id)}
            onMouseLeave={() => setHoveredPointId(null)}
          >
            <td>{index + 1}</td>
            <td>{point.latitude.toFixed(5)}</td>
            <td>{point.longitude.toFixed(5)}</td>
            <td>{point.elevation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RouteTable;
