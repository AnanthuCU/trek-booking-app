import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ReligionClaimData } from '../../types';
import styles from './ReligionClaimChart.module.css';
import { religionClaimData } from '../../data';
import ReligionClaimTable from '../religionClaimTable/ReligionClaimTable';

type Props = {
  data: ReligionClaimData[];
  // tooltipId: string;
  // handleMouseOverData: (data: any) => void;
  selectedYear: number;
};

const ReligionClaimChart: React.FC<Props> = ({ data,
  // tooltipId, handleMouseOverData, 
  selectedYear }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  const [activeRowValue, setActiveRowValue] = useState<null | string>(null)

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 769);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const activeColors = [
    '#FAA2A2',
    '#FFDCA1',
    '#AAF2FF',
    '#DFD3FF',
  ];

  const colors = [
    '#FE8484',
    '#FFB435',
    '#40CEE6',
    '#A383FF',
  ];

  useEffect(() => {
    if (!data.length || !chartRef.current) return;

    // Clear any existing SVG elements
    d3.select(chartRef.current).selectAll('*').remove();

    const width = 600;
    const height = width;
    const innerRadius = 100;
    const outerRadius = Math.min(width, height) / 2;

    // Group data by category
    const categories = Array.from(new Set(data.map((d) => d.religion)));
    const groupedData = d3.rollup(
      data,
      (v) => d3.sum(v, (d) => d.value),
      (d) => d.religion
    );


    // Radial x-scale (one bar per category)
    const offset = 0.1; // Adjust this value to control the size of the gap
    const x = d3
      .scaleBand()
      .domain(categories)
      .range([offset, Math.PI + offset]) // Start the range at the offset
      .align(0);

    // Radial y-scale (scaled to values)
    const y = d3
      .scaleRadial()
      .domain([0, d3.max(data, (d) => d.value) ?? 0])
      .range([innerRadius, outerRadius]);

    // Color scale
    const color = d3.scaleOrdinal<string>()
      .domain(categories)
      .range(d3.schemeCategory10);

    // Add padding to the SVG container by increasing the viewBox
    const padding = 40;

    // SVG container with adjusted viewBox
    const svg = d3
      .select(chartRef.current)
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2)
      .attr('viewBox', [-width / 2 - padding, -height / 2 - padding, width + padding * 2, height + padding * 2])
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;');

    // Y-axis ticks for a half radial chart
    svg
      .append('g')
      .selectAll('path')
      .data(y.ticks(5).slice(1))
      .join('path')
      .attr(
        'd',
        d3.arc<any>()
          .innerRadius((tick) => y(tick))
          .outerRadius((tick) => y(tick))
          .startAngle(0)
          .endAngle(Math.PI)
      )
      .attr('fill', 'none')
      .attr('stroke', '#E7E7E7');

    // Add gradients to defs
    const defs = svg.append('defs');

    defs
      .append('linearGradient')
      .attr('id', 'gradient1')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .html(`
      <stop offset="22.65%" stop-color="#FE8484"/>
      <stop offset="100%" stop-color="#FAA2A2"/>
    `);


    defs
      .append('linearGradient')
      .attr('id', 'gradient2')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .html(`
        <stop offset="23.32%" stop-color="#FFB435"/>
        <stop offset="98.17%" stop-color="#FFDCA1"/>
      `);

    defs
      .append('linearGradient')
      .attr('id', 'gradient3')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .html(`
        <stop offset="0%" stop-color="#AAF2FF"/>
        <stop offset="84.07%" stop-color="#40CEE6"/>
      `);


    defs
      .append('linearGradient')
      .attr('id', 'gradient4')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .html(`
        <stop offset="2.27%" stop-color="#DFD3FF"/>
        <stop offset="84.83%" stop-color="#A383FF"/>
      `);

    // tooltip style 
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#FFF')
      .style('border-radius', '0.33175rem')
      .style('padding', '10px 15px')
      .style('box-shadow', '0px 4px 16px 0px rgba(50, 50, 71, 0.06), 0px 4px 8px 0px rgba(0, 100, 168, 0.08)')
      .style('color', 'black')
      .style('opacity', 0)  // Initially hidden (transparent)
      .style('pointer-events', 'none');  // Prevent the tooltip from blocking mouse events




    // Bars with rounded corners and padding between slices
    svg
      .append('g')
      .selectAll('path')
      .data(
        Array.from(groupedData, ([category, value]) => ({ category, value }))
      )
      .join('path')
      .attr(
        'd',
        d3.arc<any>()
          .innerRadius(0)
          .outerRadius((d) => Math.min(y(d.value) ?? 0, outerRadius))
          .startAngle((d) => x(d.category) ?? 0)
          .endAngle((d) => (x(d.category) ?? 0) + x.bandwidth())
          .padAngle(0.4)
          .padRadius(innerRadius)
          .cornerRadius(10)
      )
      .attr('fill', (d, i) => `url(#gradient${i + 1})`)
      .style("cursor", "pointer")
      .on('mouseenter', (event, data) => {  // Triggered when mouse enters the element
        setActiveRowValue(data["category"]); // Set the active category value

        let obj: { comparison: null | number, diff: null | number } = { comparison: null, diff: null };

        // Perform the calculation for diff and comparison if the selected year is 2021
        if (selectedYear === 2021) {
          let obj2 = religionClaimData
            .filter((record) => record?.year === 2020 && record.religion === data.category);
          let diff = data.value - obj2[0]?.value;
          let per = Math.round((diff / data?.value) * 100);
          obj.comparison = per;
          obj.diff = diff;
        }

        Object.assign(data, obj); // Assign the calculated values to the data object

        // console.log("Data object updated: ", data);

        // Populate the tooltip with dynamic content
        tooltip
          .style('opacity', 1) // Show the tooltip
          .html(`
            <div class="${styles.tooltipMainContainer}">
              <div class="${styles.marksContainer}">
                <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.839844 7.56939C0.839844 6.09846 2.03226 4.90605 3.50318 4.90605C4.97411 4.90605 6.16652 6.09846 6.16652 7.56939H0.839844ZM3.50318 4.57313C2.39956 4.57313 1.50568 3.67925 1.50568 2.57563C1.50568 1.47201 2.39956 0.578125 3.50318 0.578125C4.6068 0.578125 5.50069 1.47201 5.50069 2.57563C5.50069 3.67925 4.6068 4.57313 3.50318 4.57313Z" fill="#5D5D5D"/>
                </svg>
                ${data.value}
              </div>
              <div class="${styles.incrementContainer} ${obj?.diff && obj.diff > 0 ? styles.positive : styles.negative}">
                ${obj?.diff && obj.comparison ? `
                  <div>
                    ${obj.diff > 0 ? `+${obj.diff}` : obj.diff}
                    ${obj.comparison && `<span>(${obj.comparison}%)</span>`}
                    ${obj.diff > 0 ?
                `<svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                          <path d="M3.94118 3.29193L2.01959 5.21355L1.51296 4.70692L4.29943 1.92042L7.08594 4.70692L6.5793 5.21355L4.65767 3.29193L4.65767 7.65234L3.94118 7.65234L3.94118 3.29193Z" fill="#16C784" />
                        </svg>`
                :
                `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5.35569 6.30573L7.27728 4.3841L7.78392 4.89073L4.99745 7.67724L2.21094 4.89073L2.71757 4.3841L4.6392 6.30573V1.94531H5.35569V6.30573Z" fill="#EB5E7E" />
                      </svg>`
              }
                  </div>
                  <div>
                    2020 vs 2021
                  </div>
                ` : ''}
              </div>
              <div class="${styles.labelContainer}">
                ${
            //@ts-ignore
            data.label2 ? "Mark :" : ""}
                ${//@ts-ignore
            data.label2 ? data.label2 : data.clause ?? data.category ?? ""}
              </div>
              <div class="${styles.yearContainer}">
                year: ${selectedYear}
              </div>
            </div>
          `)
          .style('left', `${event.pageX + 10}px`) // Position the tooltip
          .style('top', `${event.pageY + 10}px`);

        // Prevent any further propagation of the event, and prevent default behavior
        event.stopPropagation();
        event.preventDefault();
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', `${event.pageX + 10}px`) // Update position
          .style('top', `${event.pageY + 10}px`);
      })
      .on('mouseleave', (event) => {  // Triggered when mouse leaves the element
        // console.log("Mouse leave triggered");
        setActiveRowValue(null)
        tooltip.style('opacity', 0);
        // Use setTimeout to avoid potential timing issues with React state updates
        // setTimeout(() => {
        //   setActiveRowValue(null); // Reset the active row value
        //   tooltip.style('opacity', 0); // Hide the tooltip
        // }, 100); // Delay hiding the tooltip for a brief moment
      });
    // .on("mouseover", function (d, i) {
    //   setActiveRowValue(i["category"])
    // })
    // .on("mouseout", function () {
    //   setActiveRowValue(null)
    // })
    // .attr("data-tooltip-id", tooltipId)
    // .on("mousemove", function(_, d){
    //   handleMouseOverData(d)
    // } );

    // Add value labels on top of the slices at the outer radius
    svg
      .append('g')
      .selectAll('text')
      .data(
        Array.from(groupedData, ([category, value]) => ({ category, value }))
      )
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('transform', (d) => {
        const angle = ((x(d.category) ?? 0) + x.bandwidth() / 2); // Center the label on each slice
        const radius = (y(d.value) ?? outerRadius) + 20; // Position labels on the outer edge of the slice
        return `
          rotate(${(angle * 180) / Math.PI - 90})
          translate(${radius}, 0)
        `;
      })
      .text((d) => d.value) // Display the value instead of the category name
      .style('fill', '#333')
      .style('font-family', 'Inter')
      .style('font-size', '0.75rem') // Equivalent to 12px
      .style('font-weight', '600')
      .style('line-height', '1rem') // 133.333% line-height
      .style('color', ' #6D6D6D') // Apply color
      .style('fill', '#333'); // Ensure text color falls back to #333 if var is not found

    // Y-axis values
    svg
      .append('g')
      .selectAll('text')
      .data(y.ticks(5))
      .join('text')
      .attr('x', 6) // Move text slightly outward
      .attr('y', (d) => -y(d) - 5) // Add padding by subtracting 5 (adjust as needed)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'start')
      .text((d) => d)
      .style('font-family', 'Inter')  // Apply Inter font
      .style('font-size', '0.5rem')  // Equivalent to 8px
      .style('font-weight', '400')   // Regular weight
      .style('line-height', '0.625rem') // 125% line-height
      .style('color', 'var(--Black-200, #D1D1D1)')  // Apply the new color
      .style('fill', '#333'); // Ensure the fill color


    // Add the bottom line at the base of the chart
    svg
      .append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -outerRadius)
      .attr('y2', outerRadius)
      .attr('stroke', '#E7E7E7')
      .attr('stroke-width', 1);

  }, [data]);




  return (
    <div className={styles.chartMainContainer}>
      <div className={styles.chartWrapper}>
        <svg ref={chartRef}></svg>
      </div>
      <div className={styles.tableWrapper}>
        {
          !isMobile ?
            <ReligionClaimTable data={religionClaimData
              .filter((record) => record.year === parseInt(selectedYear.toString()))}
              colors={colors}
              activeColors={activeColors}
              activeRowValue={activeRowValue}
            /> : ""
        }
      </div>
    </div>
  );
};

export default ReligionClaimChart;
