import React, { useRef, useEffect, useMemo } from "react";
import {
  select,
  scaleLinear,
  line,
  extent,
  scaleLog,
  transition,
  easeCubic,
} from "d3";
import useGetClientWidth from "@/app/five-year-competition/useGetClientWidth";
import { cordForAngle, generateRangeArray } from "../../utils";
import styles from "./RadarChart.module.css";
import { CategoryData } from "../../types";

interface CordData extends CategoryData {
  index: number;
}

function RadarChart({
  data,
  cordData,
}: {
  data: any;
  cordData: CordData[];
  tooltipId: string;
  handleMouseMove: (d: CategoryData) => void;
  handleMouseLeave: () => void;
}) {
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

  const labelOffset = 5;

  useEffect(() => {
    if (svgRef.current) {
      // global transition for synchronized transitions
      const t = transition().duration(500).ease(easeCubic);

      const svg = select(svgRef.current)
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .selectAll("g.container")
        .data([null])
        .join("g")
        .attr("class", "container")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const attributes = Object.keys(data[0]);
      const values: number[] = Object.values(data[0]);

      // ticks
      // const ticks = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      const ticks = generateRangeArray(
        Math.min(...cordData.map((record) => record.value)),
        Math.max(...cordData.map((record) => record.value)),
        10
      );

      //radial scale
      const radAxis = scaleLog()
        .domain([
          Math.min(...values) === 0 ? 1 : Math.min(...values),
          Math.max(...values),
        ])
        .range([0, radius]);

      //linear scale for circle
      const linearAxis = scaleLinear()
        .domain([
          Math.min(...values) === 0 ? 1 : Math.min(...values),
          Math.max(...values),
        ])
        .range([0, radius]);

      const getSlice = (i: number) => {
        return Math.PI / 2 + (2 * Math.PI * i) / cordData.length;
      };

      // add axis line to svg
      svg
        .selectAll(`line.${styles.axisLine}`)
        .data(cordData)
        .join(
          (enter) =>
            enter
              .append("line")
              .attr("x1", width / 2)
              .attr("y1", height / 2)
              .call((enter) => enter.transition(t))
              .attr("x2", (d) => {
                return cordForAngle(getSlice(d.index), radius).x + width / 2;
              })
              .attr("y2", (d) => {
                return cordForAngle(getSlice(d.index), radius).y + height / 2;
              }),
          (update) =>
            update.call((update) =>
              update
                .transition(t)
                .attr("x1", width / 2)
                .attr("y1", height / 2)
                .attr("x2", (d) => {
                  return cordForAngle(getSlice(d.index), radius).x + width / 2;
                })
                .attr("y2", (d) => {
                  return cordForAngle(getSlice(d.index), radius).y + height / 2;
                })
            ),
          (exit) => exit.call((exit) => exit.transition(t).remove())
        )
        .attr("class", `${styles.axisLine}`)
        .attr("stroke-width", 1);

      // add text labels to the radial axis
      svg
        .selectAll(`text.${styles.axisText}`)
        .data(cordData)
        .join("text")
        .join(
          (enter) =>
            enter
              .append("text")
              .attr("x", width / 2 + labelOffset)
              .attr("y", height / 2 + labelOffset)
              .attr(
                "x",
                (d) =>
                  cordForAngle(getSlice(d.index), radius).x +
                  width / 2 +
                  labelOffset
              )
              .attr(
                "y",
                (d) =>
                  height / 2 - cordForAngle(getSlice(d.index), radius).y - 0.85
              ),
          (update) =>
            update.call((update) =>
              update
                .transition(t)
                .attr(
                  "x",
                  (d) =>
                    cordForAngle(getSlice(d.index), radius + 20).x + width / 2
                )
                .attr(
                  "y",
                  (d) =>
                    height / 2 + -cordForAngle(getSlice(d.index), radius + 20).y
                )
            ),
          (exit) => exit.call((exit) => exit.transition(t).remove())
        )
        .attr("class", `${styles.axisText}`)
        .attr("text-anchor", (d) => {
          const rotateAngle = (radAxis(d.value)! * 180) / Math.PI - 90;
          // return rotateAngle > 0 ? "end" : "start";
          return "middle";
        })
        .text((d) => {
          if (d.category.length > 5) {
            return `${d.category.slice(0, 3)}..`;
          } else {
            return d.category;
          }
        });

      // add circle axis to the svg
      svg
        .selectAll(`circle.${styles.axisCircle}`)
        .data(ticks)
        .join(
          (enter) =>
            enter
              .append("circle")
              .attr("cx", width / 2)
              .attr("cy", height / 2)
              .call((enter) =>
                enter.attr("r", (d) => {
                  return linearAxis(d) <= 0 ? 0 : linearAxis(d);
                })
              ),
          (update) =>
            update
              .attr("cx", width / 2)
              .attr("cy", height / 2)
              .call((update) =>
                update.transition(t).attr("r", (d) => {
                  return linearAxis(d) <= 0 ? 0 : linearAxis(d);
                })
              ),
          (exit) =>
            exit.call((exit) => exit.transition(t).attr("r", 0).remove())
        )
        .attr("class", `${styles.axisCircle}`)
        .attr("fill", "none")
        .attr("stroke-width", 1.0);

      //line generator
      let lineGen = line()
        .x((d: any) => d.x)
        .y((d: any) => d.y);

      //converting data point to coordinates
      const getCoordPath = (cordData: CordData[]) => {
        let coord = [];
        for (let i = 0; i < cordData.length; i++) {
          let angle = Math.PI / 2 + (2 * Math.PI * i) / cordData.length;
          coord.push(cordForAngle(angle, radAxis(cordData[i].value)));
        }
        return coord;
      };

      //drawing path
      const cord = getCoordPath(cordData);
      //spider chart
      svg
        .selectAll(`path.${styles.areaPath}`)
        .data([cord])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", "M 2,0 A 2,2 0 1,0 -2,0 A 2,2 0 1,0 2,0")
              .call((enter) =>
                enter.transition(t).attr("d", (d: any) => lineGen(d))
              ),
          (update) =>
            update.call((update) =>
              update.transition(t).attr("d", (d: any) => lineGen(d))
            ),
          (exit) => exit.call((exit) => exit.transition(t).remove())
        )
        // .join("path")
        .attr("class", `${styles.areaPath}`)
        // .attr("d", (d: any) => lineGen(d))
        .attr("stroke-width", 1.5)
        .attr("stroke", "none")
        .attr("fill", "#FE8484")
        .attr("opacity", 0.65)
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // add data points
      // svg
      //   .selectAll("circle.dataPoints")
      //   .data(cordData)
      //   .join("circle")
      //   .attr("class", "dataPoints")
      //   .attr("r", 4)
      //   .attr("cx", (d) => radius + Math.cos(radAxis(d.value)))
      //   .attr("cy", height / 2);
    }
  }, [data, width]);

  return (
    <div style={{ width: "100%" }} ref={containerRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RadarChart;
