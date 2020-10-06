import React, { Component, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import deathAttribs from "../data_files/deathdays.csv";
import deathDays from "../data_files/deaths_age_sex.csv";
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

const filter = {
  date: null,
  gender: null,
  age: null,
};

const gender = ["male", "female"];

let deathsData;

//gen funcs
const offset = (d) => {
  const scale = 45;
  return d * scale - scale * 3;
};

const parseDate = (date) => {
  return d3.time.format("%d-%b").parse(date);
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
  return <svg ref={ref}></svg>;
};

const TimeSeries = () => {
  const margin = { top: 60, right: 20, bottom: 70, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
  const y = d3.scale.linear().range([height, 0]);

  const xAxis = () =>
    d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%d-%b"));

  const yAxis = () => d3.svg.axis().scale(y).orient("left").ticks(10);

  const timeline = () =>
    d3
      .select(".timeline")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv(deathAttribs, function (data) {
    data.forEach(function (d) {
      d.date = parseDate(d.date);
      d.deaths = +d.deaths;
    });

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
      .text("Number of Deaths Per Day");

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
    const isActive = d3.select(this).classed("timelineActive");

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
};

const updateMap = (newFilter) => {
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
          filter.date === null ||
          parseDate(d.date).getTime() <= filter.date.getTime();
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

  const onMouseEnter = (d) => {
    d3.select(".tooltip").classed("showTooltip", true);
  };

  const onMouseMove = (d) => {
    d3.select(".tooltip")
      .html(`${gender[d.gender]}, ${age[d.age]}`)
      .style("left", `${event.pageX - window.scrollX + 12}px`)
      .style("top", `${event.pageY - window.scrollY - 18}px`);
  };

  const onMouseLeave = (d) => {
    d3.select(".tooltip").classed("showTooltip", false);
  };
};

const Thing = (
  <div>
    <Row>
      <Col sm={8}>
        <div>
          {/* <Container>
            <Row>
              <h1> Hello World </h1>
            </Row>
          </Container> */}
          <Row>
            <Container>
              <CholeraMap />
            </Container>
          </Row>
        </div>
      </Col>
      <Col sm={4}>
        <Row>
          <h1> Hello World </h1>
        </Row>
        <Row>
          <h1> Hello World </h1>
        </Row>
      </Col>
    </Row>
  </div>
);

export default Thing;
