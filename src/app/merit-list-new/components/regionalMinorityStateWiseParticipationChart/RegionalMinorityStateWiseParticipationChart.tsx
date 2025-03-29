"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  MeritListTooltip,
  RegionalMinorityStateWiseParticipationData,
} from "../../types";
import useGetClientWidth from "@/app/five-year-competition/useGetClientWidth";
import styles from "./RegionalMinorityStateWiseParticipationChart.module.css";
import PersonSvg from "../../components/svgMeritList/person";
import { regionalMinorityStateWiseParticipationData } from "../../data";
import { calculateDifferenceAndPercentage } from "@/app/five-year-competition/utils";
import ChartTooltip from "@/app/five-year-competition/components/chartTooltip/ChartTooltip";
import MeritListTooltipContent from "../meritListTooltipContent/MeritListTooltipContent";

type Props = {
  data: RegionalMinorityStateWiseParticipationData[];
};

// Define base gradients for the chart
const baseGradients = [
  { id: "gradient0", colors: ["#F3F601", "#FF9D0B"] },
  { id: "gradient1", colors: ["#05F0CA", "#00BDDF"] },
  { id: "gradient2", colors: ["#8E77E7", "#8E77E7"] },
  { id: "gradient3", colors: ["#FF9B71", "#FF4972"] },
];

const RegionalMinorityStateWiseParticipationChart = ({ data }: Props) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const containerWidth = useGetClientWidth(chartRef);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [tooltipContent, setTooltipContent] = useState<MeritListTooltip>();

  const tooltipId = "regionalMinorityStateWiseParticipationChartTooltipId";

  const handleMouseMove = (index: number) => {
    const mouseOverData = data[index];
    const prevYear = mouseOverData.year - 1;
    const prevYearRecord = regionalMinorityStateWiseParticipationData.find(
      (record) =>
        record.year === prevYear &&
        record.seatType === mouseOverData.seatType &&
        record.state === mouseOverData.state
    );

    if (prevYearRecord) {
      const diff = calculateDifferenceAndPercentage(
        mouseOverData.value,
        prevYearRecord.value
      );
      setTooltipContent({
        year: `${mouseOverData.year}`,
        value: mouseOverData.value,
        column: mouseOverData.seatType,
        diff: {
          difference: diff.difference,
          percentage: diff.percentage,
          prevYear: `${prevYear}`,
          currentYear: `${mouseOverData.year}`,
        },
      });
    } else {
      setTooltipContent({
        year: `${mouseOverData.year}`,
        value: mouseOverData.value,
        column: mouseOverData.seatType,
      });
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear existing chart
    d3.select(chartRef.current).select("svg").remove();

    const seatTypes = data.map((d) => d.seatType);
    const values = data.map((d) => d.value);

    const uniqueId = `chart-${Math.random().toString(36).substr(2, 9)}`;
    const gradients = baseGradients.map((gradient) => ({
      ...gradient,
      id: `${uniqueId}-${gradient.id}`,
    }));

    // Minimum slice percentage
    const minSlicePercentage = 0.03; // 3%
    const total = d3.sum(values); // Total value of all slices
    const minSliceValue = total * minSlicePercentage; // Minimum value for a slice

    // Adjust values to ensure a minimum size for each slice
    let adjustedValues = values.map((value) =>
      value < minSliceValue ? minSliceValue : value
    );

    // Redistribute excess value proportionally
    const excess = d3.sum(adjustedValues) - total;
    if (excess > 0) {
      const proportionalValues = values.map(
        (value) => (value / total) * (total - minSliceValue * values.length)
      );
      adjustedValues = adjustedValues.map((value, i) =>
        value === minSliceValue ? value : proportionalValues[i]
      );
    }

    const width = containerWidth || 400;
    const height = 400;
    const margin = 20;
    const radius = Math.min(width - margin * 2, height - margin * 2) / 2;
    const innerRadius = radius - 90;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Add gradients to defs
    const defs = svg.append("defs");
    gradients.forEach((gradient) => {
      const radialGradient = defs
        .append("radialGradient")
        .attr("id", gradient.id)
        .attr("cx", "0%")
        .attr("cy", "0%")
        .attr("r", "50%")
        .attr("fx", "0%")
        .attr("fy", "0%");

      radialGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", gradient.colors[0]);
      radialGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", gradient.colors[1]);
    });

    const pie = d3.pie<number>().value((d) => d);
    const arc = d3
      .arc<d3.PieArcDatum<number>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .cornerRadius(5);

    const arcs = pie(adjustedValues);

    svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d, i) => `url(#${gradients[i % gradients.length].id})`)
      .on("mousemove", (_, d) => {
        const index = arcs.indexOf(d);
        handleMouseMove(index);
      })
      .on("mouseover", function (event, d) {
        const index = arcs.indexOf(d);
        setHoveredIndex(index);

        // Store the original angles to revert back on mouseout
        const originalStartAngle = d.startAngle;
        const originalEndAngle = d.endAngle;

        // Add padding between adjacent slices by adjusting the angles slightly
        const paddingFactor = -0.025; // Adjust the padding factor to control the size of the gap
        d.startAngle -= paddingFactor;
        d.endAngle += paddingFactor;

        // Store the modified angles in the data for later reset
        d3.select(this)
          .data([d])
          .attr("original-start-angle", originalStartAngle)
          .attr("original-end-angle", originalEndAngle);

        const paddedArc = d3
          .arc<d3.PieArcDatum<number>>()
          .innerRadius(innerRadius)
          .outerRadius(radius + 10)
          .cornerRadius(7);

        d3.select(this).transition().duration(100).attr("d", paddedArc(d));
      })
      .on("mouseout", function (event, d) {
        setHoveredIndex(null);

        // Retrieve the original angles stored in the element data
        const originalStartAngle = d3.select(this).attr("original-start-angle");
        const originalEndAngle = d3.select(this).attr("original-end-angle");

        // Reset the angles back to their original positions without the padding
        const resetArc = d3
          .arc<d3.PieArcDatum<number>>()
          .innerRadius(innerRadius)
          .outerRadius(radius)
          .cornerRadius(5);

        // Apply the reset angle values
        d.startAngle = parseFloat(originalStartAngle);
        d.endAngle = parseFloat(originalEndAngle);

        d3.select(this).transition().duration(100).attr("d", resetArc(d));
      })
      .attr("data-tooltip-id", tooltipId);

    svg
      .selectAll(`text.${styles.radialLabels}`)
      .data(arcs)
      .join("text")
      .attr("class", `${styles.radialLabels}`)
      .text((d) => {
        // if(d.endAngle - d.startAngle)
        if (d.index !== 0) {
          return data[d.index - 1].value;
        }
        return data[data.length - 1].value;
      })
      .attr("text-anchor", "middle")
      .attr("transform", (d: any) => {
        const arcGenerator = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(radius)
          .startAngle(d.startAngle)
          .endAngle(d.endAngle);

        const center = arcGenerator.centroid(d);

        return `translate(${center})`;
      });
    // .attr("x", (d) => ((innerRadius + radius) * d.index) / 2)
    // .attr("y", (d) => (d.endAngle + d.startAngle) / 2);

    return () => {
      d3.select(chartRef.current).select("svg").remove();
    };
  }, [data, containerWidth]);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.chartContainer}>
      <ChartTooltip tooltipId={tooltipId}>
        <MeritListTooltipContent content={tooltipContent} />
      </ChartTooltip>
      <div className={styles.donutContainer} ref={chartRef}></div>
      <div className={styles.dataTableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Seat Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const isHovered = index === hoveredIndex;
              const bgColor = isHovered
                ? d3
                    .color(
                      baseGradients[index % baseGradients.length].colors[0]
                    )
                    ?.brighter(1.2)
                    .toString()
                : "transparent";
              return (
                <tr key={index} style={{ backgroundColor: bgColor }}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor:
                            baseGradients[index % baseGradients.length]
                              .colors[0],
                          marginRight: "8px",
                        }}
                      ></div>
                      {item.seatType}
                    </div>
                  </td>
                  <td className={styles.tdFlex}>
                    <PersonSvg />

                    {item.value}
                  </td>
                </tr>
              );
            })}
            <tr style={{ fontWeight: "bold", backgroundColor: "#f9f9f9" }}>
              <td>Total</td>
              <td className={styles.tdFlex}>
                <PersonSvg />

                {totalValue}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionalMinorityStateWiseParticipationChart;
