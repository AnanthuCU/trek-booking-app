"use client";

import TrekList from "@/components/TrekList/TrekList";

export default function TreksPage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Treks Page</h1>
      <p>Explore various trekking destinations here.</p>

      {/* ✅ Show All Trek Cards */}
      <TrekList />
    </div>
  );
}
