"use client";
import useGetClientWidth from "@/app/five-year-competition/useGetClientWidth";
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef } from "react";
import { LinguisticWiseMinorityCandidatesData } from "../../types";
import styles from "./GaugeChart.module.css";

type Props = {
  data: LinguisticWiseMinorityCandidatesData[];
  children?: React.ReactNode;
  gradients: string[];
  tooltipId: string;
  handleMouseLeave: () => void;
  handleMouseMove: (d: LinguisticWiseMinorityCandidatesData) => void;
};

const GaugeChart = ({
  data,
  children,
  gradients,
  tooltipId,
  handleMouseMove,
  handleMouseLeave,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const margin = useMemo(() => {
    return {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    };
  }, []);

  const containerWidth = useGetClientWidth(containerRef);
  const containerHeight = 500;
  const width = useMemo(
    () => containerWidth - margin.left - margin.right,
    [containerWidth]
  );
  const height = containerHeight - margin.top - margin.bottom;

  const radius = Math.min(width, height) / 2;

  const valueAccessor = (data: LinguisticWiseMinorityCandidatesData) =>
    data.value;
  const valueScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .range([1, (Math.PI * 3) / 2])
        .domain([
          0,
          // Math.min(...data.map(valueAccessor)),
          Math.max(...data.map(valueAccessor)) +
            Math.max(...data.map(valueAccessor)) * 0.2,
        ]),
    [data]
  );

  const arc = d3
    .arc()
    .startAngle(0)
    .endAngle((Math.PI * 3) / 2)
    .cornerRadius(20);

  const arcValues = d3.arc().cornerRadius(20);

  const lingualAccessor = (data: LinguisticWiseMinorityCandidatesData) =>
    data.lingual;

  const lingualScale = d3
    .scaleBand()
    .range([10, radius])
    .domain(data.map(lingualAccessor))
    .padding(0.3);

  const colorScale = d3
    .scaleOrdinal()
    .range(gradients)
    .domain(data.map(lingualAccessor));

  useEffect(() => {
    if (svgRef.current && data) {
      // global transition for synchronized transitions
      const t = d3.transition().duration(500).ease(d3.easeCubic);

      const svg = d3
        .select(svgRef.current)
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .selectAll("g.container")
        .data([null])
        .join("g")
        .attr("class", "container")
        .attr(
          "transform",
          `translate(${margin.left + width / 2}, ${margin.top + height / 2})`
        );

      // arcs index
      svg
        .selectAll("path.scale")
        .data(lingualScale.domain())
        .join("path")
        .attr("class", "scale")
        .attr("d", (d) => {
          const innerRadius = lingualScale(d) || 0;
          return arc({
            innerRadius,
            outerRadius: lingualScale(d)! + lingualScale.bandwidth(),
            startAngle: 10,
            endAngle: (Math.PI * 3) / 4,
          });
        })
        .attr("fill", "#F6F6F6");

      // arcs values
      svg
        .selectAll("path.values")
        .data(data)
        .join("path")
        .attr("d", (d) => {
          return arcValues({
            innerRadius: lingualScale(lingualAccessor(d)) || 0,
            outerRadius:
              lingualScale(lingualAccessor(d))! + lingualScale.bandwidth(),
            startAngle: 0,
            endAngle: valueScale(valueAccessor(d)),
          });
        })
        .attr("class", "values")
        .text((d) => `${d.lingual} - ${d.value}`)
        .attr("fill", (d) => colorScale(lingualAccessor(d)) as string)
        .attr("data-tooltip-id", tooltipId)
        .on("mousemove", (_, d) => handleMouseMove(d))
        .on("mouseleave", () => handleMouseLeave());

      // axis labels
      svg
        .selectAll(`text.${styles.axisValues}`)
        .data(data)
        .join("text")
        .attr("class", `${styles.axisValues}`)
        .text((d) => d.value)
        .attr("x", -10)
        .attr(
          "y",
          (d) =>
            -lingualScale(lingualAccessor(d))! - lingualScale.bandwidth() / 2
        )
        .attr("data-tooltip-id", tooltipId)
        .on("mousemove", (_, d) => handleMouseMove(d))
        .on("mouseleave", () => handleMouseLeave());

      // ticks
      // svg
      //   .selectAll(`text.${styles.scaleValues}`)
      //   .data(valueScale.ticks())
      //   .join("text")
      //   .attr("class", `${styles.scaleValues}`)
      //   .text((d) => `${d}`)
      //   .attr("x", (d) => radius * Math.cos(valueScale(d)))
      //   .attr("y", (d) => radius * Math.sin(valueScale(d)));
    }
  }, [data, width]);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <svg ref={svgRef}>{children}</svg>
    </div>
  );
};

export default GaugeChart;
