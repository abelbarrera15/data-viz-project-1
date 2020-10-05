import React from "react";
import * as d3 from "d3";
import streets from "../data_files/streets.json";
import deathAttribs from "../data_files/deathdays.csv";
import deathDays from "../data_files/deaths_age_sex.csv";
import { Row, Col } from "react-bootstrap";

//console.log(streets);

const Thing = (
  <div>
    <Row>
      <Col sm={8}>
        <h1> Hello World </h1>
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
