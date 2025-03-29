import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { EligibilityByRankAndMarksRangeData } from "../../types";
import styles from "./eligibilityByRankAndMarksRangeData.module.css"; // Assuming CSS module

import RiseIndicator from "../SvgComponents/RiseIndicator";
import { eligibilityByRankAndMarksRangeData } from "../../data";

type Props = {
  data: EligibilityByRankAndMarksRangeData[];
  isMobile: boolean;
  searchValue: number | string;
};

const EligibilityByRankAndMarksRangeDataChart = ({
  data,
  isMobile,
  searchValue,
}: Props) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // console.log("charts render")
    // Clear the SVG container before rendering
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    if (!data || data.length === 0) return;

    // Dimensions and margins
    const height = 600; // Fixed height
    const margin = { top: 70, right: 30, bottom: 60, left: 60 };
    const width = chartRef.current?.getBoundingClientRect().width || 800; // Dynamic width based on container

    const fixedWidth = Math.max(102 * data.length, width);

    // Create scales
    const x1 = d3
      .scaleBand()
      .domain(data.map((d) => d.labels)) // Using `labels` for the primary x-axis
      .range([margin.left, fixedWidth])
      .padding(0.4); // Increased padding to accommodate fixed bar width

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add background grid lines (horizontal)
    svg
      .append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(y.ticks()) // Use Y-axis ticks for horizontal grid lines
      .enter()
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .style("stroke", "#D1D1D1")
      .style("stroke-dasharray", "4 4") // Dotted line
      .style("stroke-width", 1);

    // Add background grid lines (vertical)
    svg
      .append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(data) // Use X-axis domain for vertical grid lines
      .enter()
      .append("line")
      .attr("x1", (d) => x1(d.labels)! + x1.bandwidth() / 2 + 50)
      .attr("x2", (d) => x1(d.labels)! + x1.bandwidth() / 2 + 50)
      .attr("y1", height - margin.bottom)
      .attr("y2", margin.top)
      .style("stroke", "#D1D1D1")
      .style("stroke-dasharray", "4 4") // Dotted line
      .style("stroke-width", 1);

    // Add linear gradient
    const defs = svg.append("defs");
    defs
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#00BCE0" },
        { offset: "100%", color: "#05F2CA" },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    defs
      .append("linearGradient")
      .attr("id", "highlighted-bars")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#F0FB95" },
        { offset: "100%", color: "#45C381" },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    // Add X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x1))
      .selectAll("text")
      .attr("text-anchor", "middle")
      .style("font-size", "10px");

    // Add Y-axis with custom styling
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-family", "Inter")
      .style("font-size", "0.625rem") // 10px
      .style("font-weight", "600") // Semi-bold
      .style("line-height", "0.8125rem") // 130% of font size
      .style("fill", "#888") // Apply the provided color
      .style("font-style", "normal"); // Normal font style


    if (searchValue) {
      // Create a box around the highlighted bars (if searchValue falls within range)
      const highlightedBars = data.filter((d) => {
        const scoreRange = d.label2.split("-");
        const lowerBound = parseInt(scoreRange[0]); // > 660 ? 660 : parseInt(scoreRange[0]);
        // console.log("lowerbond ",lowerBound)
        const upperBound = parseInt(scoreRange[1]);
        // const value = parseInt(searchValue.toString());
        // console.log("value ",parseInt(searchValue.toString()))
        const value = parseInt(searchValue.toString())  >= 661 ? 661 : parseInt(searchValue.toString());
        return lowerBound >= value;
      });

      // console.log(highlightedBars)

      // Find the X position and Y position range of the highlighted bars
      const boxX = x1(highlightedBars[0]?.labels) || 0; // X of the first bar in the range
      const boxWidth = highlightedBars.length * x1.bandwidth() * 1.6; // Total width of all bars in the range
      const boxY = Math.min(...highlightedBars.map((d) => y(d.value))) - 20; // Y position of the lowest bar
      const boxHeight =
        Math.max(...highlightedBars.map((d) => y(0) - y(d.value))) + 20; // Height of the tallest bar + some padding

      // Add a box around the highlighted range of bars
      svg
        .append("rect")
        .attr("x", boxX - 10) // Offset the box slightly from the bars
        .attr("y", boxY - 5) // Offset the box slightly from the bars
        .attr("width", boxWidth) // Adjust width to cover all bars
        .attr("height", boxHeight + 50) // Adjust height to cover all bars
        .attr("stroke", "#52C685") // Green dashed border
        .attr("stroke-width", 0.88) // Border width
        .attr("fill", "rgba(104, 201, 147, 0.10)") // Semi-transparent green background
        .attr("stroke-dasharray", "5,5"); // Dashed border for visual emphasis
    }

    // // Create a tooltip div
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

    // Add Bars and Highlighted Range Box
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x1(d.labels)! + (x1.bandwidth() - 30) / 2) // Center the bars
      .attr("y", (d) => y(d.value))
      .attr("width", 30) // Fixed bar width
      .attr("height", (d) => Math.max(y(0) - y(d.value), 0))
      .attr("rx", 5) // Rounded corners
      .attr("ry", 5) // Rounded corners
      .attr("fill", (d) => {
        const scoreRange = d.label2.split("-"); // Assuming label2 is a string like "30-50"
        const lowerBound = parseInt(scoreRange[0]);
        const upperBound = parseInt(scoreRange[1]);
        const value = parseInt(searchValue.toString()); // Convert searchValue to number if needed

        // Check if searchValue falls within the range
        if (lowerBound >= value && searchValue) {
          // Highlight the bars with a special gradient
          return "url(#highlighted-bars)"; // Apply the gradient fill for highlighted bars
        } else {
          return "url(#bar-gradient)"; // Apply gradient fill when the condition is not met
        }
      })
      .on("mouseover", (event, data) => {
        let obj: { comparison: null | number; diff: null | number } = {
          comparison: null,
          diff: null,
        };

        // Perform the calculation for diff and comparison
        if (data.year === 2021) {
          let obj2 = eligibilityByRankAndMarksRangeData.filter(
            (record) => record?.year === 2020 && record.label2 === data.label2
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
    <div class="${styles.incrementContainer} ${obj?.diff && obj.diff > 0 ? styles.positive : styles.negative
            }">
      ${obj?.diff && obj.comparison
              ? `
          <div>
            ${obj.diff > 0 ? `+${obj.diff}` : obj.diff}
            ${obj.comparison && `<span>(${obj.comparison}%)</span>`}
            ${obj.diff > 0
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
      ${data.label2 ? "Mark :" : ""} 
    
      ${data.label2
              ? data.label2
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

    // Position the SVG icon and text using foreignObject
    svg
      .selectAll(".bar-value")
      .data(data)
      .enter()
      .append("g") // Group the text and the icon
      .attr("class", "bar-value")
      .attr("transform", (d) => {
        // Calculate the position above the bar
        const barHeight = y(0) - y(d.value); // Actual height from base to value
        const minHeight = 0; // Minimum bar height

        // If the bar height is less than the minimum height, adjust to ensure the label stays above
        const yPos =
          barHeight < minHeight ? y(0) - minHeight - 10 : y(d.value) - 10;

        return `translate(${x1(d.labels)! + x1.bandwidth() / 2}, ${yPos})`;
      })
      .each(function (d) {
        const group = d3.select(this);

        // Append the value text and SVG icon using a div-like structure
        group
          .append("foreignObject")
          .attr("width", 50) // Allow enough space for both icon and text
          .attr("height", 20) // Enough height for alignment
          .attr("x", -25) // Position it centered relative to the bar
          .attr("y", -15) // Position above the bar
          .append("xhtml:div")
          .style("display", "flex")
          .style("align-items", "center") // Align items vertically centered
          .style("justify-content", "center") // Center items horizontally
          .style("font-family", "Inter") // Apply font family
          .style("font-size", "0.75rem") // Font size of 12px
          .style("font-weight", "600") // Semibold font weight
          .style("color", "#454545")
          .html(
            // Apply text color
            `
        <div style="display: flex; align-items: center; justify-content: center; padding: 2px;">
          <!-- Inline SVG Icon -->
          <svg width="10" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.33984 7.76861C2.33984 6.29768 3.53226 5.10527 5.00318 5.10527C6.47411 5.10527 7.66652 6.29768 7.66652 7.76861H2.33984ZM5.00318 4.77235C3.89956 4.77235 3.00568 3.87847 3.00568 2.77485C3.00568 1.67123 3.89956 0.777344 5.00318 0.777344C6.1068 0.777344 7.00069 1.67123 7.00069 2.77485C7.00069 3.87847 6.1068 4.77235 5.00318 4.77235Z" fill="#3D3D3D"/>
          </svg>
          <!-- Value Text -->
          <span style="margin-left: 5px;">
            ${d.value}
          </span>
        </div>
      `
          );
      });

    // Add a label above x2 for "Mark Range"
    svg
      .append("text")
      .attr("x", (margin.left + width - margin.right) / 2) // Center the label horizontally
      .attr("y", margin.top - 60) // Position above the secondary X-axis
      .attr("text-anchor", "middle")
      .style("font-family", "Inter")
      .style("font-size", "0.75rem") // Adjust font size
      .style("font-weight", "400") // Regular weight
      .style("line-height", "1rem") // Line height
      .style("fill", "var(--Black-500, #6D6D6D)") // Text color
      .text("Mark Range");

    // Add a label below x1 for "All India Rank (AIR)"
    svg
      .append("text")
      .attr("x", (margin.left + width - margin.right) / 2) // Center the label horizontally
      .attr("y", height - 0) // Position below the primary X-axis
      .attr("text-anchor", "middle")
      .style("font-family", "Inter")
      .style("font-size", "0.75rem") // Adjust font size
      .style("font-weight", "400") // Regular weight
      .style("line-height", "1rem") // Line height
      .style("fill", "var(--Black-500, #6D6D6D)") // Text color
      .text("All India Rank (AIR)");

    // Add secondary X-axis (label2 at the top level)
    svg
      .selectAll(".label2")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x1(d.labels)! + x1.bandwidth() / 2)
      .attr("y", margin.top - 30) // Position at the top margin
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text((d) => d.label2); // Using `label2` for the secondary label

    // // Remove ticks
    svg.selectAll(".domain").remove(); // Remove axis lines
  }, [data]);

  return (
    <div className={styles.chartMainContainer}>
      {!isMobile ? (
        <div className={styles.chartBannerWrapper}>
          <div className={styles.chartBannerTop}>
            <RiseIndicator /> <p>35246 Overall Candidates</p>
          </div>
          <small>
            38% of candidates are increased from past year in Karnataka
          </small>
        </div>
      ) : (
        ""
      )}
      <div className={styles.scrollableChart}>
        <svg
          ref={chartRef}
          className={styles.chartRef}
          style={{ height: "600px" }}
        ></svg>
      </div>
    </div>
  );
};

export default EligibilityByRankAndMarksRangeDataChart;
