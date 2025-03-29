"use client";
import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { CategoryData } from "../../types";
import styles from "./RadialPieChart.module.css";
import { generateRangeArray, joinTwoArrays } from "../../utils";
import useGetClientWidth from "@/app/five-year-competition/useGetClientWidth";

type Props = {
  data: CategoryData[];
  // x: number[];
  // y: string[];
  tooltipId: string;
  handleMouseMove: (data: CategoryData) => void;
  handleMouseLeave: () => void;
};

const RadialPieChart = ({
  data,
  // x,
  // y,
  tooltipId,
  handleMouseMove,
  handleMouseLeave,
}: Props) => {
  const valueAccessor = (record: any) => record.value;
  const categoryAccessor = (record: any) => record.category;

  const x = [
    Math.min(...data.map(valueAccessor)) <= 0
      ? 1
      : Math.min(...data.map(valueAccessor)),
    Math.max(...data.map(valueAccessor)),
  ];

  const y = data.map(categoryAccessor);
  // svg ref
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  //   chart dimensions
  const width = useGetClientWidth(containerRef);
  const height = 500;

  //   margin convention
  const margin = useMemo(() => {
    return {
      top: 30,
      left: 30,
      bottom: 30,
      right: 30,
    };
  }, []);

  //   inner dimensions
  const innerHeight = useMemo(
    () => height - margin.top - margin.bottom,
    [height]
  );
  const innerWidth = useMemo(() => width - margin.left - margin.right, [width]);

  const innerRadius = 50;
  const outerRadius = Math.min(innerHeight, innerWidth) / 2;

  const xAxisLabelOffset = 15;

  const arcGenerator = useMemo(() => d3.arc(), []);

  const xLinearScale = useMemo(
    () => d3.scaleLinear().range([innerRadius, outerRadius]).domain(x),
    [width, x]
  );

  const xScale = useMemo(
    () => d3.scaleLog().range([innerRadius, outerRadius]).domain(x),
    [width, x]
  );

  const yScale = useMemo(
    () =>
      d3
        .scaleBand()
        .range([0, 2 * Math.PI])
        .domain(y)
        .padding(0.05),
    [y]
  );

  const linearTicks = xLinearScale.ticks(13);
  const logTicks = generateRangeArray(
    xScale.domain()[0],
    xScale.domain()[1],
    13
  );

  const ticks1 = d3.range(
    xLinearScale.domain()[0],
    xLinearScale.domain()[1],
    (xLinearScale.domain()[1] - xLinearScale.domain()[0]) / 8
  );
  const ticks2 = d3.range(
    xScale.domain()[0],
    xScale.domain()[1],
    (xScale.domain()[1] - xScale.domain()[0]) / 8
  );

  const circleLabels = joinTwoArrays(linearTicks, logTicks);
  const circleLabels1 = joinTwoArrays(ticks1, ticks2);

  useEffect(() => {
    if (svgRef.current) {
      // global transition for synchronized transitions
      const t = d3.transition().duration(500).ease(d3.easeCubic);

      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .selectAll("g.container")
        .data([null])
        .join("g")
        .attr("class", "container")
        .selectAll("g.pie-container")
        .data([null])
        .join("g")
        .attr("class", "pie-container")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // append the circle for x axis
      svg
        .selectAll(`circle.${styles.circles}`)
        .data(circleLabels1)
        // .join(
        //   (enter) =>
        //     enter
        //       .append("circle")
        //       .attr("r", 0)
        //       .call((enter) =>
        //         enter.transition(t).attr("r", (d) => xLinearScale(d.linear))
        //       ),
        //   (update) =>
        //     update.call((update) =>
        //       update.transition(t).attr("r", (d) => xLinearScale(d.linear))
        //     ),
        //   (exit) =>
        //     exit.call((exit) => exit.transition(t).attr("r", 0).remove())
        // )
        .join("circle")
        .attr("class", `${styles.circles}`)
        .attr("r", (d) => {
          const r = xLinearScale(d.linear);
          return r > 0 ? r : 0;
        })
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("fill", "none")
        .attr("stroke", "black");

      // append the text for x axis
      svg
        .selectAll(`text.${styles.circlesText}`)
        // .data(circleLabels)
        .data(circleLabels1)
        // .join(
        //   (enter) =>
        //     enter
        //       .append("text")
        //       .attr("x", width / 2)
        //       .attr("y", height / 2)
        //       .call((enter) =>
        //         enter
        //           .transition(t)
        //           .attr("y", (d) => -xLinearScale(d.linear) - 3)
        //           .attr("x", -20)
        //       ),
        //   (update) =>
        //     update.call((update) =>
        //       update
        //         .transition(t)
        //         .attr("y", (d) => -xLinearScale(d.linear) - 3)
        //         .attr("x", -20)
        //     ),
        //   (exit) =>
        //     exit.call((exit) => exit.transition(t).attr("x", 0).remove())
        // )
        .join("text")
        .attr("y", (d) => -xLinearScale(d.linear) - 3)
        .attr("x", -20)
        .attr("class", `${styles.circlesText}`)
        .text((d) => Math.ceil(d.log));

      svg
        .selectAll(`g.${styles.labels}`)
        .data(data)
        .join("g")
        .attr("class", `${styles.labels}`)
        //       .attr(
        //         "transform",
        //         (d) => `
        //   rotate(${
        //     ((yScale(d.category)! + yScale.bandwidth() / 2) * 180) / Math.PI - 90
        //   })
        //   translate(${
        //     isNaN(xScale(d.value) + xAxisLabelOffset)
        //       ? 0
        //       : xScale(d.value) + xAxisLabelOffset
        //   },0)
        // `
        //       )
        .attr("transform", (d) => {
          const yValue = yScale(d.category)! + yScale.bandwidth() / 2;
          const xValue = xScale(d.value);

          // Check if xValue is valid
          let xTranslate = isNaN(xValue) ? 0 : xValue + xAxisLabelOffset;
          xTranslate = isFinite(xTranslate) ? xTranslate : 0;

          return `
  rotate(${(yValue * 180) / Math.PI - 90})
  translate(${xTranslate}, 0)
`;
        })
        .selectAll("text")
        .data((d) => [d])
        .join("text")
        .attr("transform", (d) =>
          (yScale(d.category)! + yScale.bandwidth() / 2 + Math.PI / 2) %
            (2 * Math.PI) <
          Math.PI
            ? "rotate(-360)translate(0,5)"
            : "rotate(360)translate(0,9)"
        )
        .text((d) => {
          if (d.value) {
            return d.category;
          } else {
            return "";
          }
        })
        .attr("outline", "none")
        .attr("data-tooltip-id", tooltipId)
        .on("mousemove", (_, data) => handleMouseMove(data))
        .on("mouseleave", () => handleMouseLeave());

      // append the arcs
      svg
        .selectAll("path.arcs")
        .data(data)
        // .join(
        //   (enter) =>
        //     enter
        //       .append("path")
        //       .attr("d", (d) =>
        //         arcGenerator({
        //           startAngle: yScale(d.category)!,
        //           endAngle: yScale(d.category)! + yScale.bandwidth(),
        //           innerRadius,
        //           outerRadius: 0,
        //         })
        //       )
        //       .call((enter) =>
        //         enter.transition(t).attr("d", (d) =>
        //           arcGenerator({
        //             startAngle: yScale(d.category)!,
        //             endAngle: yScale(d.category)! + yScale.bandwidth(),
        //             innerRadius,
        //             outerRadius: xScale(d.value),
        //           })
        //         )
        //       ),
        //   (update) =>
        //     update.call((update) =>
        //       update.transition(t).attr("d", (d) =>
        //         arcGenerator({
        //           startAngle: yScale(d.category)!,
        //           endAngle: yScale(d.category)! + yScale.bandwidth(),
        //           innerRadius,
        //           outerRadius: xScale(d.value),
        //         })
        //       )
        //     ),
        //   (exit) =>
        //     exit.call((exit) =>
        //       exit
        //         .transition(t)
        //         .attr("d", (d) =>
        //           arcGenerator({
        //             startAngle: yScale(d.category)! + yScale.bandwidth(),
        //             endAngle: yScale(d.category)! + yScale.bandwidth(),
        //             innerRadius,
        //             outerRadius: xScale(d.value),
        //           })
        //         )
        //         .remove()
        //     )
        // )
        .join("path")
        // .attr("d", (d) =>
        //   arcGenerator({
        //     startAngle: yScale(d.category)!,
        //     endAngle: yScale(d.category)! + yScale.bandwidth(),
        //     innerRadius,
        //     outerRadius: xScale(d.value),
        //   })
        // )
        .attr("d", (d) => {
          let yValue = yScale(d.category);
          let xValue = xScale(d.value);
          if (yValue && xValue) {
            yValue = isNaN(yValue) ? 0 : yValue;
            yValue = isFinite(yValue) ? yValue : 0;
            xValue = isNaN(xValue) ? 0 : xValue;
            xValue = isFinite(xValue) ? xValue : 0;

            return arcGenerator({
              startAngle: yValue,
              endAngle: yValue + yScale.bandwidth(),
              innerRadius,
              outerRadius: xValue,
            });
          } else {
            return "M10 10";
          }
        })
        .attr("class", "arcs")
        .attr("fill", "url(#category-gradient)")
        .attr("data-tooltip-id", tooltipId)
        .on("mousemove", (_, data) => handleMouseMove(data))
        .on("mouseleave", () => handleMouseLeave());
      // .on("mouseenter", function (event, d) {
      //   d3.select(this)
      //     .transition(t)
      //     .attr("d", (d: any) =>
      //       arcGenerator({
      //         startAngle: yScale(d.category)!,
      //         endAngle: yScale(d.category)! + yScale.bandwidth(),
      //         innerRadius,
      //         outerRadius: xScale(d.value) * 1.05, // Increase outer radius by 10%
      //       })
      //     );
      // })
      // // Scale down the arc when hover ends
      // .on("mouseleave", function (event, d) {
      //   // Scale down: revert the outer radius to the original value
      //   d3.select(this)
      //     .transition(t)
      //     .attr("d", (d: any) =>
      //       arcGenerator({
      //         startAngle: yScale(d.category)!,
      //         endAngle: yScale(d.category)! + yScale.bandwidth(),
      //         innerRadius,
      //         outerRadius: xScale(d.value), // Reset to original outer radius
      //       })
      //     );
      // });
    }
  }, [data, width]);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <svg ref={svgRef}>
        <defs>
          <radialGradient
            id="category-gradient"
            gradientUnits="userSpaceOnUse"
            cx={0}
            cy={0}
            r={"30%"}
          >
            <stop stopColor="#F0FB95" offset="0%" />
            <stop stopColor="#45C381" offset="100%" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default React.memo(RadialPieChart);
