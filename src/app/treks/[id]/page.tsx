"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Trek } from "@/types/trekTypes";
import RouteTable from "@/components/RouteTable/RouteTable";
import LineChart from "./components/ElevationChart/LineChart";
import { useState } from "react";

const TrekDetails = () => {
  const { id } = useParams();
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null); // ✅ lift state here

  const trek = useSelector((state: RootState) =>
    state.treks.list.find((t: Trek) => t.id === Number(id))
  );

  if (!trek) return <p style={{ textAlign: "center" }}>Trek not found!</p>;

  return (
    <div>
      <h1>{trek.name}</h1>

      {/* ✅ Pass setHoveredPointId down to RouteTable */}
      <RouteTable />

      {/* ✅ Pass hoveredPointId to LineChart */}
      <LineChart route={trek.route} hoveredPointId={hoveredPointId} />
    </div>
  );
};

export default TrekDetails;
