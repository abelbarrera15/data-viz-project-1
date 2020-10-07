import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import deathdays from "../data_files/deathdays.csv";
import deaths_age_sex from "../data_files/deaths_age_sex.csv";
import pumpsLoc from "../data_files/pumps.csv";
import { Row, Col, Container } from "react-bootstrap";

const streetsJson = require("../data_files/streets.json");

//gen consts
const age = [
  "age 0-10",
  "age 11-20",
  "age 21-40",
  "age 41-60",
  "age 61-80",
  "age 80+",
];

let filter = {
  date: null,
  gender: null,
  age: null,
};

const gender = ["male", "female"];

let deathsData;

let daysData;

//gen funcs
const offset = (d) => {
  const scale = 45;
  return d * scale - scale * 3;
};

const parseDate = (date) => {
  if (date !== undefined) {
    return d3.time.format("%d-%b").parse(date);
  }
};

const CholeraMap = () => {
  const ref = useRef();
  useEffect(() => {
    //base map initalization constant
    const map = d3
      .select(ref.current)
      .attr("width", "100%")
      .attr("height", "800")
      .attr("class", "map")
      .call(
        d3.behavior.zoom().on("zoom", function () {
          map.attr(
            "transform",
            `translate(${d3.event.translate}) scale(${d3.event.scale}) `
          );
        })
      )
      .append("g");

    //append streets and pumps d3 objects (g) on map base obj.
    const streets = map.append("g");
    const pumps = map.append("g");
    map.append("g").attr("id", "deaths");

    //d3.select("button").on("clock",reset //need to add reset button here

    const MakeMap = () => {
      //draw streets on map
      streets
        .selectAll("path")
        .data(streetsJson)
        .enter()
        .append("path")
        .attr("class", "street")
        .attr(
          "d",
          d3.svg
            .line()
            .x((d) => offset(d.x))
            .y((d) => offset(d.y))
        );

      //draw pumps on map
      d3.csv(pumpsLoc, function (data) {
        pumps
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", (d) => offset(d.x))
          .attr("cy", (d) => offset(d.y))
          .attr("class", "pump");
      });

      // draw work house on map
      map
        .append("g")
        .append("rect")
        .attr("class", "workHouse")
        .attr("x", 523)
        .attr("y", 195)
        .attr("width", 60)
        .attr("height", 50)
        .style("opacity", 0.1);

      // draw work house label on map
      map
        .append("g")
        .append("text")
        .attr("class", "workHouseLabel")
        .attr("x", 518)
        .attr("y", -243)
        .text("Work House");

      // draw brewery on map
      map
        .append("g")
        .append("rect")
        .attr("class", "brewery")
        .attr("x", 610)
        .attr("y", 76)
        .attr("width", 28)
        .attr("height", 48)
        .style("opacity", 0.1);

      // draw brewery label on map
      map
        .append("g")
        .append("text")
        .attr("class", "breweryLabel")
        .attr("x", -130)
        .attr("y", -620)
        .text("Brewery");

      // draw golden square on map
      map
        .append("g")
        .append("rect")
        .attr("class", "goldenSquare")
        .attr("x", 439)
        .attr("y", -62)
        .attr("width", 50)
        .attr("height", 50)
        .style("opacity", 0.1);

      // draw golden square label (first word) on map
      map
        .append("g")
        .append("text")
        .attr("class", "goldenSquareLabel")
        .attr("x", 445)
        .attr("y", 30)
        .text("Golden");

      // draw golden square label (second word) on map
      map
        .append("g")
        .append("text")
        .attr("class", "goldenSquareLabel")
        .attr("x", 445)
        .attr("y", 40)
        .text("Square");

      // draw broad street on map
      map
        .append("g")
        .append("text")
        .attr("class", "broadStreet")
        .attr("x", 590)
        .attr("y", -148)
        .text("Broad Street");

      // draw great marlborough street label on map
      map
        .append("g")
        .append("text")
        .attr("class", "greatStreet")
        .attr("x", 385)
        .attr("y", -336)
        .text("Great Marlborough Street");

      // draw regent street label on map
      map
        .append("g")
        .append("text")
        .attr("class", "regentStreet")
        .attr("x", -215)
        .attr("y", -358)
        .text("Regent Street");

      // draw brewer street label on map
      map
        .append("g")
        .append("text")
        .attr("class", "brewerStreet")
        .attr("x", 424)
        .attr("y", 160)
        .text("Brewer Street");
    };

    //load map through loader function
    MakeMap();
  }, []);
  //
  return (
    <div>
      <svg className="map" ref={ref}></svg>
      <div className="legend">
        <div className="pumpLabel">Pumps</div>
        <div className="maleLabel">Male Deaths</div>
        <div className="femaleLabel">Female Deaths</div>
      </div>
      <div className="tooltip"></div>
    </div>
  );
};

const TimeSeries = () => {
  const margin = { top: 60, right: 20, bottom: 70, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
  const y = d3.scale.linear().range([height, 0]);

  const xAxis = d3.svg
    .axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%d-%b"));

  const yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

  const ref = useRef();
  useEffect(() => {
    const timeline = d3
      .select(ref.current)
      .attr("class", "timeline")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv(deathdays, function (data) {
      data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.deaths = +d.deaths;
      });

      daysData = data;

      x.domain(data.map((d) => d.date));
      y.domain([0, d3.max(data, (d) => d.deaths)]);

      // title
      timeline
        .append("text")
        .attr("x", width / 2.5)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .text("Deaths Over Time Barchart");

      // y-axis labels: num deaths
      timeline
        .append("g")
        .attr("class", "axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of deaths");

      // x-axis labels: dates
      timeline
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("id", (d, i) => `timelineDate${i}`)
        .attr("class", "timelineDates")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-75)")
        .on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave)
        .on("click", onClick);

      // graph bars
      timeline
        .selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("id", (d, i) => `timelineBar${i}`)
        .attr("class", "timelineBar")
        .attr("x", (d) => x(d.date))
        .attr("width", x.rangeBand())
        .attr("y", (d) => y(d.deaths))
        .attr("height", (d) => height - y(d.deaths))
        .on("click", onClick)
        .on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave);
    });

    //timeline interactivity
    const onMouseEnter = (d, index) => {
      // animate for up to & including target
      for (let i = 0; i <= index; i++) {
        d3.select(`#timelineBar${i}`).classed("timelineHover", true);
        d3.select(`#timelineDate${i}`).classed("timelineHover", true);
      }
    };

    const onMouseLeave = (d, index) => {
      // animate for up to & including target
      for (let i = 0; i <= index; i++) {
        d3.select(`#timelineBar${i}`).classed("timelineHover", false);
        d3.select(`#timelineDate${i}`).classed("timelineHover", false);
      }
    };

    const onClick = (d, index) => {
      const isActive = d3.select(ref.current).classed("timelineActive");
      // if active link is clicked, clear all links
      if (isActive) {
        d3.selectAll(".timelineActive").classed("timelineActive", false);
        updateMap({ date: null });
        return;
      }

      d3.selectAll(".timelineActive").classed("timelineActive", false);
      for (let i = 0; i <= index; i++) {
        d3.select(`#timelineBar${i}`).classed("timelineActive", true);
      }

      let newDate = d3
        .select(`#timelineDate${index}`)
        .classed("timelineActive", true)
        .data()[0];
      updateMap({ date: newDate });
    };
  }, [
    height,
    margin.bottom,
    margin.left,
    margin.right,
    margin.top,
    width,
    x,
    xAxis,
    y,
    yAxis,
  ]);
  return <svg ref={ref}></svg>;
};

const InitDrawGraphs = () => {
  const ref = useRef();
  const ref2 = useRef();
  useEffect(() => {
    const drawGraphs = (data) => {
      let totalGenderDeaths = [0, 0];
      let totalAgeDeaths = [0, 0, 0, 0, 0, 0];
      let totalAgeDeathsMaleFemale = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ];
      let totalAgeDeathsMaleFemaleDict = [
        {
          Gender: "Male",
          "age 0-10": 0,
          "age 11-20": 0,
          "age 21-40": 0,
          "age 41-60": 0,
          "age 61-80": 0,
          "age 80+": 0,
        },
        {
          Gender: "Female",
          "age 0-10": 0,
          "age 11-20": 0,
          "age 21-40": 0,
          "age 41-60": 0,
          "age 61-80": 0,
          "age 80+": 0,
        },
      ];

      let totalAgeDeathsMaleFemaleDictGroupKey = [
        { grouping: "age 0-10", male: 0, female: 0 },
        { grouping: "age 11-20", male: 0, female: 0 },
        { grouping: "age 21-40", male: 0, female: 0 },
        { grouping: "age 41-60", male: 0, female: 0 },
        { grouping: "age 61-80", male: 0, female: 0 },
        { grouping: "age 80+", male: 0, female: 0 },
      ];

      data.forEach(function (data) {
        totalGenderDeaths[data.gender]++;
        totalAgeDeaths[data.age]++;
      });

      data.forEach(function (data) {
        totalAgeDeathsMaleFemale[data.age][data.gender]++;
        let indexer = age[data.age];
        totalAgeDeathsMaleFemaleDict[data.gender][indexer]++;
        let indexerkey = gender[data.gender];
        totalAgeDeathsMaleFemaleDictGroupKey[data.age][indexerkey]++;
      });

      //console.log(totalAgeDeathsMaleFemaleDict);

      const margin = { top: 60, right: 20, bottom: 70, left: 40 },
        width = 300 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

      const x = d3.scale.ordinal().rangeRoundBands([0, width], 0.5);
      const y = d3.scale.linear().range([height, 0]);

      const xAxis = d3.svg.axis().scale(x).orient("bottom");

      const yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

      const drawGender = () => {
        const onClick = (d, i) => {
          const isActive = d3.select(ref.current).classed("genderActive");
          if (isActive) {
            d3.selectAll(".genderActive").classed("genderActive", false);
            updateMap({ gender: null });
            return;
          }
          d3.selectAll(".genderActive").classed("genderActive", false);
          d3.select(`#genderBar${i}`).classed("genderActive", true);
          d3.select(`#genderLabel${i}`).classed("genderActive", true);
          updateMap({ gender: i });
        };

        const onMouseEnter = (d, i) => {
          d3.select(`#genderBar${i}`).classed("genderHover", true);
          d3.select(`#genderLabel${i}`).classed("genderHover", true);
        };

        const onMouseLeave = (d, i) => {
          d3.select(`#genderBar${i}`).classed("genderHover", false);
          d3.select(`#genderLabel${i}`).classed("genderHover", false);
        };

        const svg = d3
          .select(ref.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("class", "genderGraph")
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

        //label information
        x.domain(gender);
        y.domain([0, d3.max(totalGenderDeaths)]);

        svg
          .append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
          .selectAll("text")
          .attr("id", (d, i) => `genderLabel${i}`)
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-75)")
          .on("click", onClick)
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave);

        svg
          .append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Number of deaths");

        svg
          .append("text")
          .attr("x", 0)
          .attr("y", 0 - margin.top / 2)
          .attr("font-family", "sans-serif")
          .attr("font-weight", "bold")
          .text("Deaths by Gender");

        svg
          .selectAll("bar")
          .data(totalGenderDeaths)
          .enter()
          .append("rect")
          .attr("id", (d, i) => `genderBar${i}`)
          .attr("class", (d, i) => gender[i])
          .attr("x", (d, i) => x(gender[i]))
          .attr("y", (d) => y(d))
          .attr("width", x.rangeBand())
          .attr("height", (d) => height - y(d))
          .on("click", onClick)
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave);
      };
      //put back in if not working
      //drawGender();

      const drawAge = () => {
        const onMouseEnter = (d, i) => {
          d3.select(`#ageBar${i}`).classed("genderHover", true);
          d3.select(`#ageLabel${i}`).classed("genderHover", true);
        };

        const onMouseLeave = (d, i) => {
          d3.select(`#ageBar${i}`).classed("genderHover", false);
          d3.select(`#ageLabel${i}`).classed("genderHover", false);
        };

        const onClick = (d, i) => {
          const isActive = d3.select(ref2.current).classed("ageActive");
          if (isActive) {
            d3.selectAll(".ageActive").classed("ageActive", false);
            updateMap({ age: null });
            return;
          }
          d3.selectAll(".ageActive").classed("ageActive", false);
          d3.select(`#ageBar${i}`).classed("ageActive", true);
          d3.select(`#ageLabel${i}`).classed("ageActive", true);
          updateMap({ age: i });
        };

        const svg = d3
          .select(ref2.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("class", "ageGraph")
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

        //label information
        x.domain(age);
        y.domain([0, d3.max(totalAgeDeaths)]);

        svg
          .append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
          .selectAll("text")
          .attr("id", (d, i) => `ageLabel${i}`)
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-75)");

        svg
          .append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Number of deaths");

        svg
          .append("text")
          .attr("x", 0)
          .attr("y", 0 - margin.top / 2)
          .attr("font-family", "sans-serif")
          .attr("font-weight", "bold")
          .text("Deaths by Age Range");

        svg
          .selectAll("bar")
          .data(totalAgeDeaths)
          .enter()
          .append("rect")
          .attr("id", (d, i) => `ageBar${i}`)
          .attr("class", "ageBar")
          .attr("x", (d, i) => x(age[i]))
          .attr("y", (d) => y(d))
          .attr("width", x.rangeBand())
          .attr("height", (d) => height - y(d))
          .on("click", onClick)
          .on("mouseenter", onMouseEnter)
          .on("mouseleave", onMouseLeave);
      };
      //put back in if not working
      //drawAge();
      const drawGenderAndAge = () => {
        const onMouseEnter = (d, i) => {
          d3.select(`#ageBar${i}`).classed("genderHover", true);
          d3.select(`#ageLabel${i}`).classed("genderHover", true);
        };

        const onMouseLeave = (d, i) => {
          d3.select(`#ageBar${i}`).classed("genderHover", false);
          d3.select(`#ageLabel${i}`).classed("genderHover", false);
        };

        const onClick = (d, i) => {
          const isActive = d3.select(ref2.current).classed("ageActive");
          if (isActive) {
            d3.selectAll(".ageActive").classed("ageActive", false);
            updateMap({ age: null });
            return;
          }
          d3.selectAll(".ageActive").classed("ageActive", false);
          d3.select(`#ageBar${i}`).classed("ageActive", true);
          d3.select(`#ageLabel${i}`).classed("ageActive", true);
          updateMap({ age: i });
        };

        const svg = d3
          .select(ref.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("class", "ageGraph")
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

        //label information
        x.domain(age);
        y.domain([0, d3.max(totalAgeDeaths)]);

        svg
          .append("g")
          .attr("class", "x axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
          .selectAll("text")
          .attr("id", (d, i) => `ageLabel${i}`)
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-75)");

        svg
          .append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Number of deaths");

        svg
          .append("text")
          .attr("x", 0)
          .attr("y", 0 - margin.top / 2)
          .attr("font-family", "sans-serif")
          .attr("font-weight", "bold")
          .text("Deaths by Age Range");

        // console.log("total age deaths");
        // console.log(totalAgeDeaths);
        // console.log("total age deaths male female");
        // console.log(totalAgeDeathsMaleFemale);

        const groupKey = "grouping";
        const keys = age;

        const data = totalAgeDeathsMaleFemaleDictGroupKey;

        let data_indexer = null;

        // svg
        //   .selectAll("bar")
        //   .data(totalAgeDeaths)
        //   .enter()
        //   .append("rect")
        //   .attr("id", function (d, i) {
        //     console.log("i");
        //     console.log(i);
        //     console.log("d");
        //     console.log(d);
        //     return `ageBar${i}`;
        //   })
        //   .attr("class", "ageBar")
        //   .attr("x", (d, i) => x(age[i]))
        //   .attr("y", (d) => y(d))
        //   .attr("width", x.rangeBand())
        //   .attr("height", (d) => height - y(d))
        //   .on("click", onClick)
        //   .on("mouseenter", onMouseEnter)
        //   .on("mouseleave", onMouseLeave);

        totalAgeDeathsMaleFemale.forEach(function (i1) {
          let internal_indexer = null;
          if (data_indexer === null) {
            data_indexer = 0;
          } else {
            data_indexer = data_indexer + 1;
          }
          i1.forEach(function (i2) {
            if (internal_indexer === null) {
              internal_indexer = 0;
            } else {
              internal_indexer = 1;
            }
            svg
              .append("g")
              .selectAll("bar")
              .data([i2])
              .enter()
              .append("rect")
              .attr("id", function (d) {
                console.log(
                  `ageBar${parseInt(
                    data_indexer.toString() + internal_indexer.toString()
                  )}`
                );
                return `ageBar${parseInt(
                  data_indexer.toString() + internal_indexer.toString()
                )}`;
              })
              .attr("class", "ageBar")
              .attr("x", function (d) {
                console.log("X:");
                console.log("internal_indexer:" + internal_indexer);

                if (internal_indexer === 0) {
                  console.log(x(age[data_indexer]));
                  return x(age[data_indexer]);
                } else {
                  console.log(x(age[data_indexer]) + 10);
                  return x(age[data_indexer]) + 15;
                }
              })
              .attr("y", function (d) {
                //console.log(d);
                console.log("y:");
                console.log(y(d));
                return y(d);
              })
              .attr("width", x.rangeBand())
              .attr("height", (d) => height - y(d))
              .on("click", onClick)
              .on("mouseenter", onMouseEnter)
              .on("mouseleave", onMouseLeave);
          });
        });

        // svg
        //   .selectAll("bar")
        //   .data(
        //     totalAgeDeathsMaleFemale.forEach(function (temp) {
        //       //console.log(temp);
        //       if (data_indexer === null) {
        //         data_indexer = 0;
        //       } else {
        //         data_indexer = data_indexer + 1;
        //       }
        //       console.log(data_indexer);
        //       return temp;
        //     })
        //   )
        //   .enter()
        //   .append("rect")
        //   .attr("id", function (temp) {
        //     console.log("checking the data");
        //     console.log(data_indexer);
        //     return `ageBar${data_indexer}`;
        //   })
        //   .attr("class", "ageBar")
        //   .attr("x", (d, i) => x(age[data_indexer]))
        //   .attr("y", function (d) {
        //     d.foreach(function (d_d) {
        //       return y(d_d);
        //     });
        //   })
        //   .attr("width", x.rangeBand())
        //   .attr("height", function (d) {
        //     d.foreach(function (d_d) {
        //       return height - y(d_d);
        //     });
        //   })
        //   .on("click", onClick)
        //   .on("mouseenter", onMouseEnter)
        //   .on("mouseleave", onMouseLeave);

        // svg
        //   .append("g")
        //   .selectAll("g")
        //   .data(totalAgeDeathsMaleFemaleDict)
        //   .enter()
        //   .selectAll("bar") //check if I need the transform d part
        //   .data((d) => age.map((key) => ({ key, value: d[key] })))
        //   .join("rect")
        //   //.enter()
        //   //.append("rect")
        //   // .attr("id", function (d, i) {
        //   //   return `ageBar${i[0]}`;
        //   // })
        //   .attr("class", "ageBar")
        //   .attr("x", (d) => x(d.key))
        //   .attr("y", function (d) {
        //     return y(d.value);
        //   })
        //   .attr("width", x.rangeBand())
        //   .attr("height", (d) => height - y(d.value));
        // // .on("click", onClick)
        // // .on("mouseenter", onMouseEnter)
        // // .on("mouseleave", onMouseLeave);

        // svg
        //   .append("g")
        //   .selectAll("g")
        //   .data(totalAgeDeathsMaleFemale)
        //   .enter()
        //   .append("rect")
        //   .attr("id", function (d, i) {
        //     return `ageBar${i[1]}`;
        //   })
        //   .attr("class", "ageBar")
        //   .attr("x", (d, i) => x(age[i]))
        //   .attr("y", function (d) {
        //     return y(d[1]);
        //   })
        //   .attr("width", x.rangeBand())
        //   .attr("height", (d) => height - y(d[1]))
        //   .on("click", onClick)
        //   .on("mouseenter", onMouseEnter)
        //   .on("mouseleave", onMouseLeave);
      };
      drawGenderAndAge();
    };
    d3.csv(deaths_age_sex, function (d_set) {
      let temp_set = [];
      let saver = 0;
      daysData.forEach(function (d) {
        let summer = 0;
        d_set.forEach(function (d_inner) {
          if (summer < saver) {
            summer = summer + 1;
          }
          if (summer >= saver && summer < d.deaths + saver) {
            temp_set.push({
              x: d_inner.x,
              y: d_inner.y,
              age: d_inner.age,
              gender: d_inner.gender,
              date: d.date,
            });
            summer = summer + 1;
          }
        });
        saver = summer;
      });
      deathsData = temp_set;
      //console.log(temp_set);
      drawGraphs(temp_set);
      updateMap();
    });
  }, []);
  return (
    <svg ref={ref}></svg>
    // <div>
    //   <Row>
    //     <Col sm={6}>
    //       <svg ref={ref}></svg>
    //     </Col>
    //     <Col sm={6}>
    //       <svg ref={ref2}></svg>
    //     </Col>
    //   </Row>
    // </div>
  );
};

const updateMap = (newFilter) => {
  const onMouseEnter = (d) => {
    console.log("on mouse enter");
    d3.select(".tooltip").classed("showTooltip", true);
  };

  const onMouseMove = (d) => {
    console.log("on move move");
    // console.log("cannot enter here");
    // const test = d3.select(".tooltip");
    // console.log(test);
    console.log(d3.event.pageX);
    console.log(window.scrollX);
    console.log(gender[d.gender]);
    d3.select(".tooltip")
      .html(`${gender[d.gender]}, ${age[d.age]}`)
      //.style("left", `${d3.event.pageX - window.scrollX + 12}`)
      .style("left", "10px")
      //.style("top", `${d3.event.pageY - window.scrollY - 18}`);
      .style("top", "10px");
  };

  const onMouseLeave = (d) => {
    console.log("on mouse leave");
    d3.select(".tooltip").classed("showTooltip", false);
  };

  // update filter
  filter = { ...filter, ...newFilter };

  // clear current render
  d3.select("#deaths").selectAll("circle").remove();

  // apply filter & render
  d3.select("#deaths")
    .selectAll("circle")
    .data(
      deathsData.filter(function (d) {
        const matchesGender =
          filter.gender === null || d.gender == filter.gender;
        const matchesAge = filter.age === null || d.age == filter.age;
        const matchesDate =
          filter.date === null || d.date.getTime() <= filter.date.getTime();
        return matchesGender && matchesAge && matchesDate;
      })
    )
    .enter()
    .append("circle")
    .attr("cx", (d) => offset(d.x))
    .attr("cy", (d) => offset(d.y))
    .attr("class", (d) => `${gender[d.gender]} death`)
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave)
    .on("mousemove", onMouseMove);
};

const MainPage = (
  <div>
    <Row>
      <Col sm={6}>
        <div>
          <Row>
            <Container>
              <CholeraMap />
            </Container>
          </Row>
        </div>
      </Col>
      <Col sm={6}>
        <Row>
          <TimeSeries />
        </Row>
        <Row>
          <InitDrawGraphs />
        </Row>
      </Col>
    </Row>
  </div>
);

export default MainPage;
