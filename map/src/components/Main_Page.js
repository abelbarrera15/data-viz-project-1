import React, { Component, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import deathAttribs from "../data_files/deathdays.csv";
import deathDays from "../data_files/deaths_age_sex.csv";
import pumpsLoc from "../data_files/pumps.csv";
import dropSvg from "../assets/droplet.svg";
import { Row, Col, Container } from "react-bootstrap";
import rotateY from "react-p5";

const DrawStreets = () => {
  const streetsJson = require("../data_files/streets.json");

  const ref = useRef();
  useEffect(() => {
    const map = d3
      .select(ref.current)
      .attr("width", "100%")
      .attr("height", "800%")
      .call(
        d3.behavior.zoom().on("zoom", function () {
          var me = map.node();
          var x1 = me.getBBox().x + me.getBBox().width / 2;
          var y1 = me.getBBox().y + me.getBBox().height / 2;
          map.attr(
            "transform",
            `translate(${d3.event.translate}) scale(${d3.event.scale}) rotate(180, ${x1}, ${y1})`
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

      // Work House
      map
        .append("g")
        .append("rect")
        .attr("class", "workHouse")
        .attr("x", 523)
        .attr("y", 195)
        .attr("width", 60)
        .attr("height", 50)
        .style("opacity", 0.1);

      // Work House label
      map
        .append("g")
        .append("text")
        .attr("class", "workHouseLabel")
        .attr("x", 518)
        .attr("y", -243)
        .text("Work House");

      // Brewery
      map
        .append("g")
        .append("rect")
        .attr("class", "brewery")
        .attr("x", 610)
        .attr("y", 76)
        .attr("width", 28)
        .attr("height", 48)
        .style("opacity", 0.1);

      // Brewery Label
      map
        .append("g")
        .append("text")
        .attr("class", "breweryLabel")
        .attr("x", -130)
        .attr("y", -620)
        .text("Brewery");

      // Golden Square
      map
        .append("g")
        .append("rect")
        .attr("class", "goldenSquare")
        .attr("x", 439)
        .attr("y", -62)
        .attr("width", 50)
        .attr("height", 50)
        .style("opacity", 0.1);

      // Golden Square Label pt 1
      map
        .append("g")
        .append("text")
        .attr("class", "goldenSquareLabel")
        .attr("x", 445)
        .attr("y", 30)
        .text("Golden");

      // Golden Square Label pt 1
      map
        .append("g")
        .append("text")
        .attr("class", "goldenSquareLabel")
        .attr("x", 445)
        .attr("y", 40)
        .text("Square");

      // Broad street
      map
        .append("g")
        .append("text")
        .attr("class", "broadStreet")
        .attr("x", 590)
        .attr("y", -148)
        .text("Broad Street");

      // Great Marlborough Street
      map
        .append("g")
        .append("text")
        .attr("class", "greatStreet")
        .attr("x", 385)
        .attr("y", -336)
        .text("Great Marlborough Street");

      // Regent Street
      map
        .append("g")
        .append("text")
        .attr("class", "regentStreet")
        .attr("x", -215)
        .attr("y", -358)
        .text("Regent Street");

      // Brewer Street
      map
        .append("g")
        .append("text")
        .attr("class", "brewerStreet")
        .attr("x", 424)
        .attr("y", 160)
        .text("Brewer Street");
    };

    //MakeMap();
    //init map
    const loadMakeMap = new Promise(function (resolve) {
      MakeMap();
      resolve(1);
    });

    //rotate map
    loadMakeMap.then(() => {
      map.attr("transform", function () {
        var me = map.node();
        var x1 = me.getBBox().x + me.getBBox().width / 2;
        var y1 = me.getBBox().y + me.getBBox().height / 2;
        //return `scale(1, -1)`;
        return `rotate(180, ${x1}, ${y1})`;
      });
    });
    //   .then(() => {
    //     map.attr("transform", function (d) {
    //       return this.getAttribute("transform") + " rotateY(180)";
    //     });
    //   });

    // svgElement.append("circle").attr("cx", 200).attr("cy", 70).attr("r", 50);
  }, []);
  //
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
