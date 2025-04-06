"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { RoutePoint } from "@/types/trekTypes";

type Props = {
  route: RoutePoint[];
  hoveredPointId: number | null;
};

const LineChart = ({ route, hoveredPointId }: Props) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!route || route.length === 0) return;

    // === Step 1: Compute cumulative distance ===
    let totalDistance = 0;
    const distanceData = route.map((point, index) => {
      if (index === 0) return { ...point, distance: 0 };

      const prev = route[index - 1];
      const R = 6371;
      const dLat = ((point.latitude - prev.latitude) * Math.PI) / 180;
      const dLon = ((point.longitude - prev.longitude) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((prev.latitude * Math.PI) / 180) *
          Math.cos((point.latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;

      totalDistance += d;
      return { ...point, distance: totalDistance };
    });

    // === Step 2: Define chart dimensions ===
    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    // === Step 3: Define scales ===
    const x = d3
      .scaleLinear()
      .domain(d3.extent(distanceData, (d) => d.distance) as [number, number])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(distanceData, (d) => d.elevation)! - 20,
        d3.max(distanceData, (d) => d.elevation)! + 20,
      ])
      .range([height - marginBottom, marginTop]);

    // === Step 4: Define line generator ===
    const line = d3
      .line<any>()
      .x((d) => x(d.distance))
      .y((d) => y(d.elevation))
      .curve(d3.curveMonotoneX);

    // === Step 5: Create SVG ===
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr(
        "style",
        "max-width: 100%; height: auto; height: intrinsic; font: 10px sans-serif;"
      )
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible")
      .on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", (event) => event.preventDefault());

    svg.selectAll("*").remove(); // clear previous render

    // === Step 6: Add x-axis ===
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickFormat((d) => `${d} km`)
          .tickSizeOuter(0)
      );

    // === Step 7: Add y-axis with grid and label ===
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Elevation (m)")
      );

    // === Step 8: Add line path ===
    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(distanceData));

    // === Step 9: Create tooltip group ===
    const tooltip = svg.append("g").style("display", "none");

    // === Step 10: Tooltip event handlers ===
    const bisect = d3.bisector((d: any) => d.distance).center;

    function pointermoved(event: any) {
      const pointerX = d3.pointer(event)[0];
      const distance = x.invert(pointerX);
      const i = bisect(distanceData, distance);

      const d = distanceData[i];
      tooltip.style("display", null);
      tooltip.attr("transform", `translate(${x(d.distance)},${y(d.elevation)})`);

      const path = tooltip
        .selectAll("path")
        .data([,])
        .join("path")
        .attr("fill", "white")
        .attr("stroke", "black");

      const text = tooltip
        .selectAll("text")
        .data([,])
        .join("text")
        .call((text) =>
          text
            .selectAll("tspan")
            .data([
              `${d.distance.toFixed(2)} km`,
              `${d.elevation.toFixed(1)} m`,
            ])
            .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => (i === 0 ? "bold" : null))
            .text((d) => d)
        );

      size(text, path);
    }

    function pointerleft() {
      tooltip.style("display", "none");
    }

    function size(text: any, path: any) {
      const { x, y, width: w, height: h } = text.node().getBBox();
      text.attr("transform", `translate(${-w / 2},${15 - y})`);
      path.attr(
        "d",
        `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
      );
    }

    // === Step 11: Optional highlight from table hover ===
    if (hoveredPointId !== null) {
      const point = distanceData.find((p) => p.id === hoveredPointId);
      if (point) {
        svg
          .append("circle")
          .attr("cx", x(point.distance))
          .attr("cy", y(point.elevation))
          .attr("r", 5)
          .attr("fill", "red");
      }
    }
  }, [route, hoveredPointId]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
