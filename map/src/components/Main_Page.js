import React, { Component, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import deathAttribs from "../data_files/deathdays.csv";
import deathDays from "../data_files/deaths_age_sex.csv";
import { Row, Col, Container } from "react-bootstrap";

const DrawStreets = () => {
  const streetsJson = require("../data_files/streets.json");

  const ref = useRef();
  useEffect(() => {
    const map = d3
      .select(ref.current)
      .attr("width", "100%")
      .attr("heigth", "100%");
    //   .call(
    //     d3.zoom().on("zoom", function () {
    //       map.attr(
    //         "transform",
    //         `translate(${d3.zoom.TranslateBy}) scale(${d3.zoom.scaleBy})`
    //       );
    //     })
    //   )
    //.append("g")
    //const svgElement = d3.select(ref.current);

    //const streets = map.append("g");
    //const pumps = map.append("g");
    //map.append("g").attr("id", "deaths");

    //d3.select("button").on("clock",reset //need to add reset button here

    const SIZE = 500;

    let mapXScale = d3.scaleLinear();
    let mapYScale = d3.scaleLinear();
    let mapWidth = SIZE;
    let mapHeight = SIZE;

    const lineFunction = (d) => {
      d3.line()
        .x(function (d) {
          return mapXScale(d.x);
        })
        .y(function (d) {
          return mapYScale(d.x);
        });
    };

    const MakeMap = () => {
      mapXScale.domain([3, 20]).range([0, mapWidth]);
      mapYScale.domain([3, 20]).range([mapHeight, 0]);

      console.log(streetsJson.length);

      for (let i = 0; i < streetsJson.length; i++) {
        console.log(streetsJson[i]);
        map.append("path").attr("d", lineFunction(streetsJson[i]));
      }
      //   streets
      //     .selectAll("path")
      //     .data(streetsJson)
      //     .enter()
      //     .append("path")
      //     .attr("class", "street")
      //     .attr(
      //       "d",
      //       d3
      //         .line()
      //         .x((d) => d3.stackOffsetExpand(d.x))
      //         .y((d) => d3.stackOffsetExpand(d.y))
      //     );
    };

    MakeMap();

    //svgElement.append("circle").attr("cx", 200).attr("cy", 70).attr("r", 50);
  }, []);

  return <svg ref={ref}></svg>;
};

/* //functioning example
const Circle = () => {
  const ref = useRef();
  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.append("circle").attr("cx", 200).attr("cy", 70).attr("r", 50);
  }, []);
  return <svg ref={ref} />;
};
*/

const Thing = (
  <div>
    <Row>
      <Col sm={8}>
        <div>
          <Container>
            <Row>
              <h1> Hello World </h1>
            </Row>
          </Container>
          <Row>
            <div>
              <DrawStreets />
            </div>
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
