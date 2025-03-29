"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  CandidatesParticipatedCounsellingData,
  MeritListTooltip,
} from "../../types";
import useGetClientWidth from "@/app/five-year-competition/useGetClientWidth";
import styles from "./CandidatesParticipatedCounsellingChart.module.css";
import PersonSvg from "../../components/svgMeritList/person";
import RedArrow from "../../components/svgMeritList/redArrow";
import { String } from "aws-sdk/clients/acm";
import { candidatesParticipatedCounsellingData } from "../../data";
import { calculateDifferenceAndPercentage } from "@/app/five-year-competition/utils";
import ChartTooltip from "@/app/five-year-competition/components/chartTooltip/ChartTooltip";
import MeritListTooltipContent from "../meritListTooltipContent/MeritListTooltipContent";
import useWindowSize from "../../hooks/useWindowSize";
type Props = {
  data: CandidatesParticipatedCounsellingData[];
};

type Circle = {
  radius: number;
  status: "Registered" | "Qualified" | "Participated";
  state: string;
  year: number;
  value: number;
};

const CandidatesParticipatedCounsellingChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const containerWidth = useGetClientWidth(chartRef);

  const isMobile = useWindowSize().width < 480;

  const tooltipId = "candidatesParticipatedCounsellingChartTooltipId";
  const [hoveredStatus, setHoveredStatus] = useState<string>();

  const registered = data.find((d) => d.status === "Registered")?.value || 0;
  const qualified = data.find((d) => d.status === "Qualified")?.value || 0;
  const participated =
    data.find((d) => d.status === "Participated")?.value || 0;

  const qualifiedPercentage = registered
    ? ((qualified / registered) * 100).toFixed(2)
    : "0";
  const participatedPercentage = registered
    ? ((participated / registered) * 100).toFixed(2)
    : "0";

  const percentages = {
    Registered: "100",
    Qualified: qualifiedPercentage,
    Participated: participatedPercentage,
  };

  const colorMap: Record<string, string> = {
    Participated: "#FFDB6D",
    Qualified: "#FFEBA6",
    Registered: "#FFF7D3",
  };

  // tooltip
  const [tooltipContent, setTooltipContent] = useState<MeritListTooltip>();

  const handleMouseMove = (mouseOverData: Circle) => {
    const prevYear = mouseOverData.year - 1;
    const prevYearRecord = candidatesParticipatedCounsellingData.find(
      (record) =>
        record.year === prevYear &&
        record.status === mouseOverData.status &&
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
        column: mouseOverData.status,
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
        column: mouseOverData.status,
      });
    }
  };

  useEffect(() => {
    if (!data.length || !containerWidth) return;

    d3.select(chartRef.current).select("svg").remove();

    const margin = 20;
    const width = containerWidth - margin * 2;
    const height = isMobile ? width / 1.2 : width / 1.5;
    const radiusScaleFactor = isMobile ? width / 1000 : width / 1500;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("class", `${styles.svgContainer}`);

    // const tooltip = d3
    //   .select(chartRef.current)
    //   .append("div")
    //   .style("position", "absolute")
    //   .style("background", "#fff")
    //   .style("padding", "5px 10px")
    //   .style("border", "1px solid #ccc")
    //   .style("border-radius", "5px")
    //   .style("pointer-events", "none")
    //   .style("opacity", 0);

    const sortedData = [...data].sort((a, b) => b.value - a.value);

    const circles = sortedData.map((record) => ({
      ...record,
      radius: Math.sqrt(record.value) * radiusScaleFactor,
    }));

    let yOffset = 0;
    const largestCircleRadius = circles[0]?.radius || 0;

    circles.forEach((circle, index) => {
      if (index === 0) {
        yOffset = 0;
      } else {
        yOffset = largestCircleRadius - circle.radius;
      }

      const circleGroup = svg
        .append("g")
        .attr("class", `circle-group-${circle.status.toLowerCase()}`);

      const circleElement = circleGroup
        .append("circle")
        .attr("cx", 0)
        .attr("cy", yOffset)
        .attr("r", circle.radius)
        .attr("fill", colorMap[circle.status])
        .attr("stroke-width", 1)
        .attr("opacity", 0.8)
        .on("mouseover", (event) => {
          setHoveredStatus(circle.status);
          circleElement
            .transition()
            .duration(200)
            .attr(
              "transform",
              `translate(0, -${circle.radius * 0.05}) scale(1.05)`
            );

          d3.select(`.table-row-${circle.status.toLowerCase()}`).style(
            "background-color",
            colorMap[circle.status]
          );

          // textElement.transition().duration(200).style("opacity", 0);

          // tooltip
          //   .html(
          //     `<strong>${circle.status}</strong><br/>Year: ${circle.year}<br/>Value: ${circle.value}`
          //   )
          //   .style("left", `${event.pageX + 10}px`)
          //   .style("top", `${event.pageY + 10}px`)
          //   .style("opacity", 1);
        })
        .on("mouseout", () => {
          circleElement
            .transition()
            .duration(200)
            .attr("transform", "scale(1)");

          d3.select(`.table-row-${circle.status.toLowerCase()}`).style(
            "background-color",
            null
          );

          textElement.transition().duration(200).style("opacity", 1);
          setHoveredStatus(undefined);

          // tooltip.style("opacity", 0);
        })
        .attr("data-tooltip-id", tooltipId)
        .on("mousemove", () => {
          handleMouseMove(circle);
        });

      const textElement = circleGroup
        .append("text")
        .attr("x", 0)
        .attr(
          "y",
          yOffset +
            (circle.status === "Participated"
              ? 0
              : circle.status === "Qualified"
              ? -circle.radius * 0.8
              : -circle.radius * 0.8)
        )
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#6D6D6D")
        .attr("cursor", "default")
        .text(
          ` ${circle.value} (${Math.round(
            parseInt(percentages[circle.status])
          )}%)`
        )
        .attr("data-tooltip-id", tooltipId)
        .on("mousemove", () => {
          handleMouseMove(circle);
        });
    });
  }, [data, containerWidth]);

  return (
    <div className={styles.chartContainer}>
      {/* tooltip */}
      <ChartTooltip tooltipId={tooltipId}>
        <MeritListTooltipContent content={tooltipContent} />
      </ChartTooltip>

      <div className={styles.circlesContainer} ref={chartRef}></div>

      <div className={styles.dataTableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>State</th>
              <th>Total</th>
              <th>Percentage</th>
            </tr>
          </thead>
          {/* <tbody>
            <tr className="table-row-registered">
              <td>
                <span
                  className={styles.circleDot}
                  style={{ backgroundColor: "#FFF7D3" }}
                ></span>{" "}
                <span>Registered</span>
              </td>
              <td className={styles.tableSpanRow}>
                <PersonSvg />
                {registered}
              </td>
              <td>100%</td>
            </tr>
            <tr className="table-row-qualified">
              <td>
                <span
                  className={styles.circleDot}
                  style={{ backgroundColor: "#FFEBA6" }}
                ></span>{" "}
                Qualified
              </td>
              <td className={styles.tableSpanRow}>
                <PersonSvg />
                {qualified}
              </td>
              <td>{qualifiedPercentage}%</td>
            </tr>
            <tr className="table-row-participated">
              <td>
                <span
                  className={styles.circleDot}
                  style={{ backgroundColor: "#FFDB6D" }}
                ></span>{" "}
                Participated
              </td>
              <td className={styles.tableSpanRow}>
                <PersonSvg />
                {participated}
              </td>

              <td>
                <span>
                  <RedArrow />
                </span>
                {participatedPercentage}%
              </td>
            </tr>
          </tbody> */}
          <tbody>
            {data.map((record, index) => {
              return (
                <tr
                  key={index}
                  className={styles.trContainer}
                  style={{
                    backgroundColor:
                      hoveredStatus === record.status ? "#FFF7D3" : "",
                  }}
                >
                  <td className={styles.tdFlex}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                    >
                      <ellipse
                        cx="3.76712"
                        cy="4.07038"
                        rx="3.27103"
                        ry="3.28913"
                        fill={colorMap[record.status]}
                      />
                    </svg>
                    {record.status}
                  </td>
                  <td className={styles.tdFlex}>
                    <PersonSvg />
                    {record.value}
                  </td>
                  <td className={styles.tdFlex}>
                    {index !== 0 && <RedArrow />}
                    {percentages[record.status]}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidatesParticipatedCounsellingChart;
