import React, { Component, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import deathAttribs from "../data_files/deathdays.csv";
import deathDays from "../data_files/deaths_age_sex.csv";
import { Row, Col, Container } from "react-bootstrap";
import { stackOffsetExpand, stackOffsetNone } from "d3";

const DrawStreets = () => {
  const streetsJson = require("../data_files/streets.json");

  const ref = useRef();
  useEffect(() => {
    const map = d3
      .select(ref.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .call(
        d3.behavior.zoom().on("zoom", function () {
          map.attr(
            "transform",
            `translate(${d3.event.translate}) scale(${d3.event.scale})`
          );
        })
      )
      .append("g");

    //const svgElement = d3.select(ref.current);

    const streets = map.append("g");
    const pumps = map.append("g");
    map.append("g").attr("id", "deaths");

    //d3.select("button").on("clock",reset //need to add reset button here

    const offset = (d) => {
      const scale = 45;
      return d * scale - scale * 3;
    };

    const lineFunction = (d) => {
      d3.svg
        .line()
        .x((d) => offset(d.x))
        .y((d) => offset(d.y));
    };

    const MakeMap = () => {
      console.log(streetsJson.length);
      streets
        .selectAll("path")
        .data(streetsJson)
        .enter()
        .append("path")
        .attr("class", "street")
        .attr("d", lineFunction(streetsJson));
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
            <Container>{/*<DrawStreets />*/}</Container>
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
