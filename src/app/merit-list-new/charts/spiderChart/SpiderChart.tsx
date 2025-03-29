"use client";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import useGetClientWidth from "@/app/five-year-competition/useGetClientWidth";
import { CategoryData, DataPoint } from "../../types";
import styles from "./SpiderChart.module.css";
import { generateRangeArray } from "../../utils";

type SpiderChartProps = {
  data: DataPoint[];
  tooltipId: string;
  handleMouseMove: (d: DataPoint) => void;
  handleMouseLeave: () => void;
};

const SpiderChart: React.FC<SpiderChartProps> = ({
  data,
  tooltipId,
  handleMouseLeave,
  handleMouseMove,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const width = useGetClientWidth(containerRef);
  const height = 600;

  const minValue = Math.min(
    ...data.filter((record) => record.value !== 0).map((record) => record.value)
  );
  const maxValue = Math.max(
    ...data.filter((record) => record.value !== 0).map((record) => record.value)
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 60; // Padding for labels
    const angleSlice = (2 * Math.PI) / data.length;

    // Scale to normalize values
    const radiusScale = d3
      .scaleLog()
      .domain([minValue, maxValue])
      .range([0, maxRadius]);

    const circleLinearScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([0, maxRadius]);

    // Calculate points for the spider chart
    const points = data.map((d, i) => {
      const angle = i * angleSlice;
      const radius = radiusScale(d.value);
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        category: d.category,
        value: d.value,
      };
    });

    // Close the shape by adding the first point to the end
    points.push(points[0]);

    // Draw the spider chart path
    const lineGenerator = d3
      .line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveLinear);

    //   circle axis - rounds
    svg
      .selectAll("circle.axisCircle")
      .data(generateRangeArray(minValue, maxValue, 10))
      .join("circle")
      .attr("class", "axisCircle")
      .attr("r", (d) => {
        const val = circleLinearScale(d);
        return val > 0 ? val : 0;
      })
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("fill", "none")
      .attr("stroke", "#E7E7E7");

    svg
      .selectAll("path.spider-chart-path")
      .data([points])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "spider-chart-path")
            .attr("d", lineGenerator)
            .attr("fill", "url(#path-gradient)"),
        (update) => update.attr("d", lineGenerator),
        (exit) => exit.remove()
      );

    // Draw axes and labels
    const axes = data.map((d, i) => {
      const angle = i * angleSlice;
      return {
        x1: centerX,
        y1: centerY,
        x2: centerX + maxRadius * Math.cos(angle),
        y2: centerY + maxRadius * Math.sin(angle),
        category: d.category,
        angle, // Add the angle to the object
      };
    });

    svg
      .selectAll("line.axis-line")
      .data(axes)
      .join(
        (enter) =>
          enter
            .append("line")
            .attr("class", "axis-line")
            .attr("stroke", "#E7E7E7"),

        (update) => update.attr("stroke", "#E7E7E7"),
        (exit) => exit.remove()
      )
      .attr("x1", (d) => d.x1)
      .attr("y1", (d) => d.y1)
      .attr("x2", (d) => d.x2)
      .attr("y2", (d) => d.y2);

    svg
      .selectAll(`text.${styles.axisLabel}`)
      .data(axes)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", `${styles.axisLabel}`)
            .attr("font-size", "10px")
            .attr("text-anchor", "middle"),
        (update) => update.attr("font-size", "10px"),
        (exit) => exit.remove()
      )
      .attr("x", (d) => d.x2 + 40 * Math.cos(d.angle)) // Move slightly outside
      .attr("y", (d) => d.y2 + 40 * Math.sin(d.angle)) // Move slightly outside
      .attr("dy", "0.35em")
      .text((d) => d.category);

    // Add circles for data points
    svg
      .selectAll("circle.data-point")
      .data(points.slice(0, -1)) // Exclude duplicate closing point
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "data-point")
            .attr("r", 1)
            .attr("fill", "#FF8787"),
        (update) => update.transition().attr("r", 3).attr("fill", "#FF8787"),
        (exit) => exit.remove()
      )
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("stroke-width", 6)
      .attr("stroke", "transparent")
      .attr("data-tooltip-id", tooltipId)
      .on("mousemove", (_, d) => handleMouseMove(d))
      .on("mouseleave", () => handleMouseLeave());

    //   circle tick label
    svg
      .selectAll(`text.${styles.axisCircleText}`)
      .data(generateRangeArray(minValue, maxValue, 10).slice(1))
      .join("text")
      .attr("class", `${styles.axisCircleText}`)
      .attr("x", (d) => circleLinearScale(d) + width / 2 - 20)
      .attr("y", height / 2 + 20)
      .text((d) => d);
  }, [data, width, height, maxValue, minValue]);

  return (
    <div style={{ width: "100%" }} ref={containerRef}>
      <svg ref={svgRef} width={width} height={height}>
        <defs>
          <radialGradient
            id="path-gradient"
            // cx="0"
            // cy="0"
            // r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(211.996 195) rotate(-1.25445) scale(205.549 228.698)"
          >
            <stop offset="0%" stopColor="#FAA2A2" />
            <stop offset={"25%"} stopColor="#FE8484" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SpiderChart;
