import React, { Component, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import deathAttribs from "../data_files/deathdays.csv";
import deathDays from "../data_files/deaths_age_sex.csv";
import pumpsLoc from "../data_files/pumps.csv";
import dropSvg from "../assets/droplet.svg";
import { Row, Col, Container } from "react-bootstrap";

const DrawStreets = () => {
  const streetsJson = require("../data_files/streets.json");

  const ref = useRef();
  useEffect(() => {
    const map = d3
      .select(ref.current)
      .attr("width", "100%")
      .attr("height", "800px")
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

    const MakeMap = () => {
      //base map d3 obj
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
    };

    //init map
    const loadMakeMap = new Promise((resolve, reject) => {
      MakeMap();
    });

    //rotate map
    loadMakeMap.then((upd) => {
      map.attr("transform", function () {
        var me = map.node();
        var x1 = me.getBBox().x + me.getBBox().width / 2; //the center x about which you want to rotate
        var y1 = me.getBBox().y + me.getBBox().height / 2; //the center y about which you want to rotate

        return `rotate(180, ${x1}, ${y1})`; //rotate 180 degrees about x and y
      });
    });

    // svgElement.append("circle").attr("cx", 200).attr("cy", 70).attr("r", 50);
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
            <Container>
              <DrawStreets />
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
