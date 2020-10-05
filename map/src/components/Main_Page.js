import React, { Component, useEffect, useRef } from "react";
import * as d3 from "d3";
import streets from "../data_files/streets.json";
import deathAttribs from "../data_files/deathdays.csv";
import deathDays from "../data_files/deaths_age_sex.csv";
import { Row, Col } from "react-bootstrap";

/*const DrawStreets = () => {
  for (i=0; i<streets.length; i++){
      let streets_data = streets[i].xy.split(/\s+/);


  }
};*/

/*
class DrawStreets extends Component {
    d3.select(this.refs.map)
    .selectAll("h2")
    .attr("width", "100%")
    .attr("height", "100%")
    .call(
      d3.zoom().on("zoom", function () {
        map.attr(
          "transform",
          `translate($d3.event.translate}) scale($d3.event.scale})`
        );
      })
    )
    .append("g")

    render(<div ref="map"></div>)
}
*/

const Circle = () => {
  const ref = useRef();
  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.append("circle").attr("cx", 200).attr("cy", 70).attr("r", 50);
  }, []);
  return <svg ref={ref} />;
};

const Thing = (
  <div>
    <Row>
      <Col sm={8}>
        <div>
          <row>
            <h1> Hello World </h1>
          </row>
          <row>
            <Circle />
          </row>
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
