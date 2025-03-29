"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as d3 from "d3";
import { indiaGeoJson } from "../../indiaGeoJson2";
import { getMinMax, getSeats, markColors } from "../../utils";
import styles from "./IndiaMap.module.css";
import useGetClientWidth from "@/common/tool/useGetClientWidth/useGetClientWidth";
import {
  CollegeData,
  CounsellingType,
  Distributions,
  MapView,
  RawInstituteData,
  StateData,
  View,
} from "../../types";
import MapStateTooltip from "../mapStateTooltip/MapStateTooltip";
import ChartTooltip from "@/common/tool/chartTooltip/ChartTooltip";
import { collegeMetaData } from "../../data";
import MapCollegeTooltip from "../mapCollegeTooltip/MapCollegeTooltip";
import useIsMobile from "../../useIsMobile";

type Props = {
  selectedState: string;
  setSelectedState: Dispatch<SetStateAction<string[]>>;
  distribution: Distributions;
  choroplethData: StateData[];
  view: View;
  year: number;
  filteredCollegeData: RawInstituteData[];
  counsellingType: CounsellingType;
  setSelectedCollege: React.Dispatch<React.SetStateAction<string>>;
  mapView?: MapView;
  marksView: "location" | "radius";
};

const IndiaMap = ({
  selectedState,
  setSelectedState,
  distribution,
  choroplethData,
  view,
  year,
  filteredCollegeData,
  counsellingType,
  setSelectedCollege,
  mapView = "table",
  marksView,
}: Props) => {
  // ref to select the svg
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const marginContainerRef = useRef<any>(null);
  const labelContainerRef = useRef<any>(null);

  // const marksView = "radius";
  const marksOpacity = 0.5;

  const stateMarkerContainerRef = useRef<any>(null);

  const stateTooltipId = "india-map-state-tooltip-id";
  const collegeTooltipId = "india-map-college-tooltip-id";
  const [stateTooltipContent, setStateTooltipContent] = useState<StateData>();
  const [collegeTooltipContent, setCollegeTooltipContent] =
    useState<CollegeData>();

  const labelColor = "#5d5d5d";
  const labelRed = "red";
  const labelGreen = "green";
  // const labelRed = "#ea3943";
  // const labelGreen = "#16c784";
  const filledStateColor = "rgb(187, 222, 253)";
  const unSelectedColor = "rgba(241, 243, 244, 1)";
  const borderColor = "rgb(132, 132, 132)";
  // const borderColor = "rgb(236, 233, 233)";

  const choroplethColors = ["#E0F6FF", "#41C9FF"];

  const containerWidth = useGetClientWidth(containerRef);
  const isMobile = useIsMobile(769);

  // svg dimensions
  const width = containerWidth;
  // const height = 450;
  const height = mapView === "table" ? 600 : 400;

  const zoomPadding = {
    width: mapView === "table" ? 150 : 80,
    height: mapView === "table" ? 150 : 80,
  };

  const zoomXOffset = 20;

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.bottom - margin.top;

  let projection = d3
    .geoMercator()
    .fitSize([innerWidth, innerHeight], indiaGeoJson as any);
  let geoGenerator = d3.geoPath().projection(projection);

  const minMax = getMinMax(
    view === "Difference View"
      ? choroplethData.map((item) => item.difference[distribution])
      : choroplethData.map((item) => item[distribution])
  );

  const colorScale = d3
    .scaleLinear<string>()
    .domain([minMax[0], minMax[1]])
    .range(choroplethColors);

  const seatsMinMax = useMemo(() => {
    return getMinMax(
      filteredCollegeData
        .filter((item) => parseInt(getSeats(item, counsellingType)))
        .map((item) => parseInt(getSeats(item, counsellingType)))
    );
  }, [filteredCollegeData]);

  const radiusScale = useMemo(() => {
    return d3.scaleLog().domain(seatsMinMax).range([4, 17]);
  }, [filteredCollegeData, counsellingType]);

  const getLabelColor = (value: number) => {
    if (view === "Difference View") {
      return value > 0 ? labelGreen : labelRed;
    } else {
      return labelColor;
    }
  };

  const getCoordinates = (d: RawInstituteData) => {
    const college = collegeMetaData.find(
      (col) =>
        col.name === d.InstituteName &&
        col.instituteType === d.InstituteType &&
        col.state === d.StateName
    );
    if (college) {
      const coords = projection([college.coordinates.x, college.coordinates.y]);
      return coords ? coords : [0, 0];
    } else {
      return [0, 0];
    }
  };

  // Function to zoom into a selected state
  const zoomToState = (d: any) => {
    const [[x0, y0], [x1, y1]] = geoGenerator.bounds(d); // Get bounding box

    const constrictedWidth = innerWidth;
    // const constrictedWidth = innerWidth - 120;
    const widthScale = (constrictedWidth - zoomPadding.width) / (x1 - x0);
    const heightScale = (innerHeight - zoomPadding.height) / (y1 - y0);
    const scale = Math.min(widthScale, heightScale); // Choose the smaller scale

    const stateWidth = ((x1 - x0) * scale) / 2;
    const containerWidth = innerWidth / 2;
    const remainingWidth = (containerWidth - stateWidth) / scale;

    // const newX = (x0 + x1) / 2 + remainingWidth / 2;
    const newX = (x0 + x1) / 2;
    const newY = (y0 + y1) / 2;

    const selectedState = d.properties.st_nm;
    setSelectedState([selectedState]);

    if (marginContainerRef.current) {
      marginContainerRef.current
        .transition()
        .duration(750) // Smooth transition
        .attr(
          "transform",
          `translate(${width / 2}, ${
            height / 2
          }) scale(${scale}) translate(${-newX}, ${-newY})`
        )
        .attr("stroke-width", 0.25)
        .attr("stroke", borderColor);

      marginContainerRef.current
        .selectAll("path")
        .transition()
        .duration(750)
        .attr("fill", unSelectedColor);

      marginContainerRef.current
        .select(`path[state-name="${selectedState}"]`)
        .datum(d)
        .transition()
        .duration(750)
        .attr("fill", filledStateColor);

      labelContainerRef.current
        .transition()
        .duration(50)
        .attr("opacity", 0)
        .attr("display", "none");

      stateMarkerContainerRef.current
        .selectAll("circle.collegeMarks")
        .data(filteredCollegeData, (d: RawInstituteData) => d.InstituteName)
        .join(
          // ENTER
          (enter: any) =>
            enter
              .append("circle")
              .attr("class", "collegeMarks")
              .attr("r", (d: RawInstituteData) =>
                marksView === "radius"
                  ? radiusScale(parseInt(getSeats(d, counsellingType)))
                  : 4
              )
              .attr(
                "fill",
                (d: RawInstituteData) => markColors[d.InstituteType]
              )
              .attr("cx", (d: RawInstituteData) => getCoordinates(d)[0])
              .attr("cy", (d: RawInstituteData) => getCoordinates(d)[1])
              .attr("title", (d: RawInstituteData) => d.InstituteName)
              .style("opacity", 0)
              .transition()
              .duration(500)
              .delay(800)
              .style("opacity", marksView === "radius" ? marksOpacity : 1),

          // UPDATE
          (update: any) =>
            update
              .transition()
              .duration(500)
              .attr("cx", (d: RawInstituteData) => getCoordinates(d)[0])
              .attr("cy", (d: RawInstituteData) => getCoordinates(d)[1])
              .style("opacity", marksView === "radius" ? marksOpacity : 1)
              .attr("r", (d: RawInstituteData) =>
                marksView === "radius"
                  ? radiusScale(parseInt(getSeats(d, counsellingType)))
                  : 4
              ),

          // EXIT
          (exit: any) =>
            exit.transition().duration(500).style("opacity", 0).remove()
        )
        .attr("stroke", "#ffffff")
        .attr("stroke-width", marksView === "radius" ? "0" : "2.5")
        .attr("data-tooltip-id", collegeTooltipId)
        .on("mouseenter", (e: any, d: RawInstituteData) => {
          e.preventDefault();
          handleCollegeMouseEnter(d);
        })
        .on("click", (e: any, d: RawInstituteData) => {
          e.preventDefault();
          setSelectedCollege(d.InstituteName);
        });
    }
  };

  // Function to reset zoom
  const resetZoom = () => {
    if (marginContainerRef.current) {
      marginContainerRef.current
        .transition()
        .duration(750)
        .delay(400)
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .attr("stroke", "null");

      // marginContainerRef.current
      //   .selectAll("path")
      //   .transition()
      //   .duration(750)
      //   .delay(400)
      //   .attr("fill", function () {
      //     // @ts-ignore
      //     const stateName = d3.select(this).attr("state-name"); // Get the state name
      //     const number = getValueForState(stateName, distribution, view);
      //     return number ? colorScale(number) : unSelectedColor; // Use the function to get the color
      //   });

      labelContainerRef.current
        .attr("display", "block")
        .transition()
        .delay(1000)
        .duration(500)
        .attr("opacity", 1);

      // Apply a transition to the college markers before removing them
      stateMarkerContainerRef.current
        .selectAll("circle.collegeMarks")
        .transition()
        .duration(500)
        .attr("r", 0)
        .style("opacity", 0)
        .remove();

      setSelectedState([]);
    }
  };

  const getValueForState = (
    state: string,
    attribute: Distributions,
    view: View
  ) => {
    const record = choroplethData.find((item) => item.State === state);
    if (view === "Difference View") {
      const diffValue = record?.difference[attribute];
      return record
        ? record.difference
          ? record.difference[attribute]
          : 0
        : 0;
    }
    return record ? record[attribute] : 0;
  };

  const handleStateMouseEnter = useMemo(
    () => (stateName: string) => {
      const targetState = choroplethData.find(
        (item) => item.State === stateName
      );
      setStateTooltipContent(targetState);
    },
    [choroplethData]
  );

  const handleCollegeMouseEnter = (record: RawInstituteData) => {
    setCollegeTooltipContent({
      State: record.InstituteName,
      Seats: parseInt(getSeats(record, counsellingType)),
      InstituteType: record.InstituteType,
      difference: {
        Seats: 0,
        Colleges: 0,
      },
    });
  };

  const handleStateMouseLeave = () => {};

  // SVG RENDER USE EFFECT
  useEffect(() => {
    if (svgRef.current) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("style", "background-color: white");

      // Create a container group for zooming
      marginContainerRef.current = svg
        .selectAll("g.margin-container")
        .data([null])
        .join("g")
        .attr("class", "margin-container")
        .attr("transform", `translate(${margin.top}, ${margin.left})`);

      // Draw map paths
      marginContainerRef.current
        .selectAll("path")
        .data(indiaGeoJson.features)
        .join("path")
        .attr("d", (d: any) => geoGenerator(d))
        .attr("state-name", (d: any) => d.properties.st_nm)
        .attr("fill", (d: any) => {
          const number = getValueForState(
            d.properties.st_nm,
            distribution,
            view
          );
          return unSelectedColor;
        })
        // .attr("fill", (d: any) => {
        //   const number = getValueForState(
        //     d.properties.st_nm,
        //     distribution,
        //     view
        //   );
        //   return number ? colorScale(number) : unSelectedColor;
        // })
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .attr("data-tooltip-id", stateTooltipId)
        .on("mouseenter", (e: any, d: any) => {
          e.preventDefault();
          handleStateMouseEnter(d.properties.st_nm);
        })
        .on("click", (_: any, d: any) => {
          zoomToState(d);
        });

      stateMarkerContainerRef.current = svg
        .selectAll(`g.stateMarkers`)
        .data([null])
        .join("g")
        .attr("class", "stateMarkers")
        .attr("transform", `translate(${margin.left}, ${margin.left})`);

      // Attach reset zoom function to the background click
      svg.on("click", (event) => {
        if (
          event.target.tagName !== "path" &&
          event.target.tagName !== "circle" &&
          event.target.tagName !== "text"
        ) {
          // resetZoom();
          setSelectedState([""]);
        }
      });
    }
  }, [
    containerWidth,
    // distribution,
    // choroplethData,
    // view
  ]);

  useEffect(() => {
    if (svgRef.current) {
      const transformValue = marginContainerRef.current.attr("transform");
    }
    if (selectedState !== "") {
      const feature = indiaGeoJson.features.find((feature) => {
        return feature.properties.st_nm === selectedState;
      });
      if (feature) {
        zoomToState(feature);
      }
    }
    if (selectedState === "") {
      resetZoom();
    }
  }, [
    selectedState,
    containerWidth,
    distribution,
    choroplethData,
    view,
    marksView,
  ]);

  // effect to draw the labels
  useEffect(() => {
    // if (labelContainerRef.current) {
    labelContainerRef.current = marginContainerRef.current
      .selectAll(`g.${styles.labels}`)
      .data(indiaGeoJson.features)
      .join("g")
      // .attr("transform", `translate(${margin.left}, ${margin.left})`)
      .attr("class", `${styles.labels}`)
      .selectAll("text")
      .data((d: any) => [d])
      .join("text")
      .attr("x", (d: any) => geoGenerator.centroid(d)[0])
      .attr("y", (d: any) => geoGenerator.centroid(d)[1])
      .attr("data-tooltip-id", stateTooltipId)
      .attr("font-size", mapView === "dashboard" ? "8px" : "10px")
      .on("mouseenter", (_: any, d: any) => {
        handleStateMouseEnter(d.properties.st_nm);
      })
      .on("click", (_: any, d: any) => {
        zoomToState(d);
      })
      .attr("fill", (d: any) =>
        getLabelColor(getValueForState(d.properties.st_nm, distribution, view))
      )
      .text((d: any) => {
        const numberValue = getValueForState(
          d.properties.st_nm,
          distribution,
          view
        );

        if (numberValue === 0) return "";
        if (view === "Difference View") {
          return numberValue > 0 ? `+${numberValue}` : `${numberValue}`;
        } else {
          return numberValue;
        }
      });
    // }
  }, [view, distribution, choroplethData, containerWidth]);

  // effect to fill the states
  useEffect(() => {
    if (!selectedState) {
      marginContainerRef.current
        .selectAll("path")
        .transition()
        .duration(750)
        .delay(400)
        .attr("fill", function () {
          // @ts-ignore
          const stateName = d3.select(this).attr("state-name"); // Get the state name
          const number = getValueForState(stateName, distribution, view);
          return number ? colorScale(number) : unSelectedColor; // Use the function to get the color
        });
    }
  }, [view, distribution, choroplethData, containerWidth, selectedState]);

  return (
    <div
      style={{ width: isMobile ? "100%" : mapView === "table" ? "75%" : "65%" }}
      ref={containerRef}
    >
      {!selectedState && (
        <ChartTooltip tooltipId={stateTooltipId}>
          <MapStateTooltip data={stateTooltipContent} year={year} />
        </ChartTooltip>
      )}
      {selectedState && (
        <ChartTooltip tooltipId={collegeTooltipId}>
          <MapCollegeTooltip data={collegeTooltipContent} year={year} />
        </ChartTooltip>
      )}
      <svg className={styles.svg} ref={svgRef}></svg>
    </div>
  );
};

export default React.memo(IndiaMap);
