import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ClauseAndCategoryWiseCandidatesData } from "../../types";
import styles from "./ClauseAndCategoryWiseCandidatesChart.module.css";
import { clauseAndCategoryWiseCandidatesData } from "../../data";

type Props = {
  data: ClauseAndCategoryWiseCandidatesData[];
  height?: number; // Optional height, default is 600px
  minBarWidth?: number; // Minimum bar width, default is 5px
  maxBarWidth?: number;
};

const ClauseAndCategoryWiseCandidatesChart = ({
  data,
  height = 600,
  minBarWidth = 20,
  maxBarWidth = 1100,
}: Props) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const container = d3.select(chartRef.current);
    const containerWidth =
      container.node()?.getBoundingClientRect().width || 800;

    // Clear any existing chart
    container.selectAll("*").remove();

    // Append gradient definition
    const defs = container.append("defs");
    defs
      .append("linearGradient")
      .attr("id", "barGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#F3F601" },
        { offset: "100%", color: "#FFA80B" },
      ])
      .join("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    // Group data by year and clause
    const groupedData = d3.group(data, (d) => d.year);

    // Flatten data for rendering
    const preparedData = Array.from(groupedData, ([year, clauses]) => ({
      year,
      clauses: clauses.map((d) => ({
        clause: d.clause,
        value: d.value,
      })),
    }));

    // Dimensions and margins
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const innerWidth = containerWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3
      // .scaleLinear()
      .scaleLog()
      // .domain([0, d3.max(data, (d) => d.value) || 0])
      .domain([1, d3.max(data, (d) => d.value) || 1])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(
        preparedData.flatMap((d) =>
          d.clauses.map((c) => `${d.year}-${c.clause}`)
        )
      )
      .range([0, innerHeight])
      .padding(0.3);

    const svg = container
      .attr("viewBox", `0 0 ${containerWidth} ${height}`)
      // .attr('preserveAspectRatio', 'xMidYMid meet')
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Y-axis
    svg
      .append("g")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => {
            // console.log(d);
            // Custom label formatting: Remove "year-" prefix and format
            return d.split("-")[1] + " " + d.split("-")[2]; // Get the part after "year-"
          })
          .tickSize(0)
      ) // Remove tick lines
      .call((g) => g.select(".domain").remove()) // Remove the axis line
      .selectAll("text") // Target the text labels
      .style("font-family", "Inter") // Set the font family
      .style("font-size", "0.625rem") // Set font size (0.625rem = 10px)
      .style("font-weight", "600") // Set font weight to semibold
      .style("font-style", "normal") // Set font style (normal)
      .style("line-height", "0.8125rem") // Set line height (130% of font size)
      .style("color", "var(--Black-400, #888)"); // Set color using the variable

    // X-axis
    // svg
    //   .append('g')
    //   .call(d3.axisBottom(xScale).tickSize(0)) // Remove ticks
    //   .attr('transform', `translate(0, ${innerHeight})`)  // Position the X-axis at the bottom
    //   .call((g) => g.select('.domain').remove()) // Remove the axis line (domain)
    //   .selectAll('text')  // Select the text labels
    //   .style('font-size', '12px')  // Set font size for labels
    //   .style('font-weight', 'bold');  // Optional: set font weight for labels

    // X-axis
    svg
      .append("g")
      .call(d3.axisBottom(xScale).tickSize(0)) // Remove ticks
      .attr("transform", `translate(0, ${innerHeight})`) // Position the X-axis at the bottom
      .call((g) => g.select(".domain").remove()) // Remove the axis line (domain)
      .selectAll("text") // Select the text labels
      .style("font-family", "Inter") // Apply the specified font family
      .style("font-size", "0.625rem") // Apply the font size (10px equivalent)
      .style("font-style", "normal") // Ensure the font style is normal
      .style("font-weight", "600") // Apply the bold font weight
      .style("line-height", "0.8125rem") // Set the line height
      .style("fill", "#888") // Set the text color
      .style("text-anchor", "middle"); // Align text to the center

    // tooltip style
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#FFF")
      .style("border-radius", "0.33175rem")
      .style("padding", "10px 15px")
      .style(
        "box-shadow",
        "0px 4px 16px 0px rgba(50, 50, 71, 0.06), 0px 4px 8px 0px rgba(0, 100, 168, 0.08)"
      )
      .style("color", "black")
      .style("opacity", 0) // Initially hidden (transparent)
      .style("pointer-events", "none"); // Prevent the tooltip from blocking mouse events

    // Bars with gradient fill and minimum width
    svg
      .selectAll(".bar")
      .data(
        preparedData.flatMap((d) =>
          d.clauses.map((c) => ({
            year: d.year,
            clause: c.clause,
            value: c.value,
          }))
        )
      )
      .join("rect")
      .attr("class", "bar")
      .attr("y", (d) => yScale(`${d.year}-${d.clause}`) || 0)
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .attr("width", (d) =>
        Math.max(Math.min(xScale(d.value), maxBarWidth), minBarWidth)
      ) // Ensure minimum width
      .attr("fill", "url(#barGradient)")
      .attr("rx", 5) // Radius for rounded corners (horizontal)
      .attr("ry", 5)
      .on("mouseover", (event, data) => {
        let obj: { comparison: null | number; diff: null | number } = {
          comparison: null,
          diff: null,
        };

        // Perform the calculation for diff and comparison
        if (data.year === 2021) {
          let obj2 = clauseAndCategoryWiseCandidatesData.filter(
            (record) => record?.year === 2020 && record.clause === data.clause
          );
          // console.log("obj2 =============", obj2)
          let diff = data.value - obj2[0]?.value;
          let per = Math.round((diff / data?.value) * 100);
          obj.comparison = per;
          obj.diff = diff;
        }

        Object.assign(data, obj);

        // console.log("data obj ", data)

        // Populate the tooltip with dynamic content
        tooltip
          .style("opacity", 1) // Show the tooltip
          .html(
            `
  <div class="${styles.tooltipMainContainer}">
    <div class="${styles.marksContainer}">
      <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.839844 7.56939C0.839844 6.09846 2.03226 4.90605 3.50318 4.90605C4.97411 4.90605 6.16652 6.09846 6.16652 7.56939H0.839844ZM3.50318 4.57313C2.39956 4.57313 1.50568 3.67925 1.50568 2.57563C1.50568 1.47201 2.39956 0.578125 3.50318 0.578125C4.6068 0.578125 5.50069 1.47201 5.50069 2.57563C5.50069 3.67925 4.6068 4.57313 3.50318 4.57313Z" fill="#5D5D5D"/>
      </svg>
      ${data.value}
    </div>
    <div class="${styles.incrementContainer} ${
              obj?.diff && obj.diff > 0 ? styles.positive : styles.negative
            }">
      ${
        obj?.diff && obj.comparison
          ? `
          <div>
            ${obj.diff > 0 ? `+${obj.diff}` : obj.diff}
            ${obj.comparison && `<span>(${obj.comparison}%)</span>`}
            ${
              obj.diff > 0
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                <path d="M3.94118 3.29193L2.01959 5.21355L1.51296 4.70692L4.29943 1.92042L7.08594 4.70692L6.5793 5.21355L4.65767 3.29193L4.65767 7.65234L3.94118 7.65234L3.94118 3.29193Z" fill="#16C784" />
              </svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5.35569 6.30573L7.27728 4.3841L7.78392 4.89073L4.99745 7.67724L2.21094 4.89073L2.71757 4.3841L4.6392 6.30573V1.94531H5.35569V6.30573Z" fill="#EB5E7E" />
              </svg>`
            }
          </div>

          <div>
              2020 vs 2021
          </div>
        `
          : ""
      }
    </div>
    <div class="${styles.labelContainer}">
      ${
        //@ts-ignore
        data.label2 ? "Mark :" : ""
      } 
           
      ${
        //@ts-ignore
        data.label2
          ? //@ts-ignore
            data.label2
          : //@ts-ignore
            data.clause ?? data.category ?? ""
      }
    </div>
    <div class="${styles.yearContainer}">
      year: ${data.year}
    </div>
  </div>
        `
          )

          .style("left", `${event.pageX + 10}px`) // Position the tooltip
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`) // Update position
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0); // Hide the tooltip
      });

    // Add dotted lines after each bar
    svg
      .selectAll(".dotted-line")
      .data(
        preparedData.flatMap((d) =>
          d.clauses.map((c) => ({
            year: d.year,
            clause: c.clause,
            value: c.value,
          }))
        )
      )
      .join("line")
      .attr("class", "dotted-line")
      .attr("x1", (d) => 0) // Start the line from the left of the chart (0)
      .attr("y1", (d) => {
        // Y-Position of the current bar
        const yPosition = yScale(`${d.year}-${d.clause}`);
        return yPosition !== undefined ? yPosition - 5 : 0; // Start at the top of the bar
      })
      .attr("x2", innerWidth) // End of the line at the width of the bar
      .attr("y2", (d) => {
        // Keep the line at the same Y position
        const yPosition = yScale(`${d.year}-${d.clause}`);
        return yPosition !== undefined ? yPosition - 5 : 0;
      })
      .attr("stroke", "#D1D1D1") // Color of the dotted line
      .attr("stroke-dasharray", "4") // Make the line dotted
      .attr("stroke-width", 1); // Line width

    // Labels
    svg
      .selectAll(".label")
      .data(
        preparedData.flatMap((d) =>
          d.clauses.map((c) => ({
            year: d.year,
            clause: c.clause,
            value: c.value,
          }))
        )
      )
      .join("text")
      .attr("class", "label")
      // .attr('y', (d) => (yScale(`${d.year}-${d.clause}`) || 0) + yScale.bandwidth() / 2)
      // .attr('x', (d) => Math.max(xScale(d.value), minBarWidth) + 10) // Add padding (increase the number for more space)
      .attr(
        "y",
        (d) => (yScale(`${d.year}-${d.clause}`) || 0) + yScale.bandwidth() / 2
      )
      .attr(
        "x",
        (d) =>
          Math.max(Math.min(xScale(d.value), maxBarWidth), minBarWidth) + 10
      ) // Add padding (increase the number for more space)
      .attr("dy", "0.35em")
      .text((d) => d.value)
      .style("font-family", "Inter")
      .style("font-size", "0.75rem")
      .style("font-weight", "600")
      .style("font-style", "normal")
      .style("line-height", "1rem")
      .style("color", "var(--Black-800, #454545)");
  }, [data, height, minBarWidth]);

  return (
    <div className={styles.chartMainContainer}>
      <svg ref={chartRef} className={styles.chartRefStyle}></svg>
    </div>
  );
};

export default ClauseAndCategoryWiseCandidatesChart;
