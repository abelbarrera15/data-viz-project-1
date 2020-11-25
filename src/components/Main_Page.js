import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import deathdays from "../data_files/deathdays.csv";
import deaths_age_sex from "../data_files/deaths_age_sex.csv";
import pumpsLoc from "../data_files/pumps.csv";
import { Row, Col, Container } from "react-bootstrap";
import {
  SliderInput,
  SliderTrack,
  SliderTrackHighlight,
  SliderMarker,
} from "@reach/slider";
import "@reach/slider/styles.css";


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

const gender = ["male", "female"];

let deathMap;

let daysData;

let beforeDate = 1;

let pumpData;

const CholeraMap = () => {
  const ref = useRef();
  const margin = { top: 60, right: 20, bottom: 70, left: 40 };
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

    const MakeMap = () => {
      //draw streets on map
      streets
        .selectAll("path")
        .data(streetsJson)
        .enter()
        .append("path")
        .attr("stroke","black")
        .attr("stroke-width","3")
        .attr("fill","none")
        .attr(
          "d",
          d3.svg
            .line()
            .x((d) => d.x * 45 - 45 * 3)
            .y((d) => d.y * 45 - 45 * 3)
        );

      //draw pumps on map
      d3.csv(pumpsLoc, function (data) {
        pumps
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", (d) => d.x * 45 - 45 * 3)
          .attr("cy", (d) => d.y * 45 - 45 * 3)
          .attr("fill","2a385b")
          .attr("r",12)

        pumpData = data;
      });

      // draw work house on map
      map
        .append("g")
        .append("rect")
        .attr("x", 523)
        .attr("y", 195)
        .attr("width", 60)
        .attr("height", 50)
        .style("opacity", 0.1)
        .attr(
          "transform",
          `rotate(30)`
        );

      // draw work house label on map
      map
        .append("g")
        .append("text")
        .attr("x", 535)
        .attr("y", -243)
        .attr("font-size",10)
        .attr(
          "transform",
          `rotate(28) scale(1, -1)`
        )
        .text("Work");

        map
        .append("g")
        .append("text")
        .attr("x", 531)
        .attr("y", -230)
        .attr("font-size",10)
        .attr(
          "transform",
          `rotate(28) scale(1, -1)`
        )
        .text("House");

      // draw brewery on map
      map
        .append("g")
        .append("rect")
        .attr("x", 610)
        .attr("y", 76)
        .attr("width", 28)
        .attr("height", 48)
        .style("opacity", 0.1)
        .attr(
          "transform",
          `rotate(30)`
        );

      // draw brewery label on map
      map
        .append("g")
        .append("text")
        .attr("x", -127)
        .attr("y", -620)
        .attr("font-size",10)
        .attr(
          "transform",
          `rotate(-61) scale(1, -1)`
        )
        .text("Brewery");

      // draw golden square on map
      map
        .append("g")
        .append("rect")
        .attr("x", 439)
        .attr("y", -62)
        .attr("width", 50)
        .attr("height", 50)
        .style("opacity", 0.1)
        .attr(
          "transform",
          `rotate(35)`
        );

      // draw golden square label
      map
        .append("g")
        .append("text")
        .attr("x", 445)
        .attr("y", 30)
        .attr("font-size",10)
        .attr(
          "transform",
          `rotate(35) scale(1, -1)`
        )
        .text("Golden");

      map
        .append("g")
        .append("text")
        .attr("x", 445)
        .attr("y", 40)
        .attr("font-size",10)
        .attr(
          "transform",
          `rotate(35) scale(1, -1)`
        )
        .text("Square");

      // draw broad street label on map
      map
        .append("g")
        .append("text")
        .attr("x", 505)
        .attr("y", -150)
        .attr("font-size",10)
        .attr("font-weight","bold")
        .attr(
          "transform",
          `rotate(28) scale(1, -1)`
        )
        .text("Broad");

      map
        .append("g")
        .append("text")
        .attr("x", 542)
        .attr("y", -150)
        .attr("font-size",10)
        .attr("font-weight","bold")
        .attr(
          "transform",
          `rotate(28) scale(1, -1)`
        )
        .text("Street");

      // draw great marlborough street label on map
      map
        .append("g")
        .append("text")
        .attr("x", 394)
        .attr("y", -336)
        .attr("font-size",10)
        .attr("font-weight","bold")
        .attr(
          "transform",
          `rotate(23) scale(1, -1)`
        )
        .text("Great Marlborough");

      map
        .append("g")
        .append("text")
        .attr("x", 490)
        .attr("y", -336)
        .attr("font-size",10)
        .attr("font-weight","bold")
        .attr(
          "transform",
          `rotate(23) scale(1, -1)`
        )
        .text("Street");

      // draw regent street label on map
      map
        .append("g")
        .append("text")
        .attr("x", -215)
        .attr("y", -358)
        .attr("font-size",10)
        .attr("font-weight","bold")
        .attr(
          "transform",
          `rotate(-61) scale(1, -1)`
        )
        .text("Regent Street");

      // draw brewer street label on map
      map
        .append("g")
        .append("text")
        .attr("x", 385)
        .attr("y", 160)
        .attr("font-size",10)
        .attr("font-weight","bold")
        .attr(
          "transform",
          `rotate(42) scale(1, -1)`
        )
        .text("Brewer");

      map
        .append("g")
        .append("text")
        .attr("x", 425)
        .attr("y", 160)
        .attr("font-size",10)
        .attr("font-weight","bold")
        .attr(
          "transform",
          `rotate(42) scale(1, -1)`
        )
        .text("Street");

      map
        .append("g")
        .append("text")
        .attr("x", 0)
        .attr("y", -660)
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr(
          "transform",
          `translate(${margin.left}, ${margin.top}) scale(1, -1)`
        )
        .text("Cholera Map");
    };

    //load map through loader function
    MakeMap();
  }, [margin.left, margin.top]);
  //
  return (
    <div>
      <Row>
        <h6 style={{ marginTop: "20px", marginLeft: "20px" }}>Map Tooltip</h6>
      </Row>
      <Row>
        <div
          style={{
            marginLeft: "20px",
            marginTop: "5px",
            width: "50%",
            height: "40px",
            paddingLeft: "30px",
            border: "2px solid black",
          }}
        >
          <div style={{ paddingLeft: "0px" }} className="tooltip"></div>
        </div>
      </Row>

      <Row>
        <svg className="map" ref={ref}></svg>
        <div className="legend">
          <div className="pumpLabel">Pumps</div>
          <div className="maleLabel">Male Deaths</div>
          <div className="femaleLabel">Female Deaths</div>
        </div>
      </Row>
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
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

    d3.csv(deathdays, function (data) {
      data.forEach(function (d) {
        d.date = d3.time.format("%d-%b").parse(d.date)
        d.deaths = +d.deaths;
      });

      daysData = data;

      x.domain(data.map((d) => d.date));
      y.domain([0, d3.max(data, (d) => d.deaths)]);

      // timeline barchart title
      timeline
        .append("text")
        .attr("x", width / 2.5)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .text("Deaths Over Time ScatterPlot");

      // label y-axis
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

      // label x-axis
      timeline
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("id", (d, i) => `timelineDate${i}`)
        .attr("text-anchor", "end")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-75)")


      var scatterTip = d3.select("body").append("div")
      .attr("class", "scatter-info")
      .style("opacity", 0);

      // add the dots for the scatterplot
      timeline
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("id", (d, i) => `timelineBar${i}`)
        .attr("fill","#9e9cc2")
        .attr("cx", function (d) { return x(d.date); } )
        .attr("cy", function (d) { return y(d.deaths); } )
        .attr("r", 5)
        .on("mouseover", function(d,i){
          scatterTip.transition()
          .duration('50')
          .attr('opacity','.85');
          scatterTip.transition()
          .duration(50)
          .style("opacity",'1');
          scatterTip.html(d.deaths)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 15) + "px");

          if (beforeDate === 1){
            PlotMap(deathMap.filter(iter => iter.date <= d.date));
          }

          else {
            PlotMap(deathMap.filter(iter => iter.date === d.date));
          }
        })
        .on("mouseout",function(d,i){
          scatterTip.transition()
          .duration('50')
          .style("opacity", 0);

          PlotMap(deathMap);

          })
        


    });
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

  const dateSetter = () =>
  {
    if (beforeDate === 1){
      beforeDate = 0
    }
    else {
      beforeDate = 1
    }
  }

  return <div>
            <div
            style={{
            marginTop: "20px",
            marginLeft: "400px"
            }}
            >
            <Row>
              <button onMouseDown={dateSetter}>Date Handler</button>
            </Row>
            </div>
            <Row>
              <svg ref={ref}></svg>
            </Row>
          </div>;
};

const InitBarChart = () => {
  const ref = useRef();
  useEffect(() => {
    const BarChart  = (data) => {
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

      data.forEach(function (data) {
        totalGenderDeaths[data.gender]++;
        totalAgeDeaths[data.age]++;
      });

      data.forEach(function (data) {
        totalAgeDeathsMaleFemale[data.age][data.gender]++;
      });

      const margin = { top: 60, right: 20, bottom: 70, left: 40 },
        width = 400 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

      const x = d3.scale.ordinal().rangeRoundBands([0, width], 0.5);
      const y = d3.scale.linear().range([height, 0]);

      const xAxis = d3.svg.axis().scale(x).orient("bottom");

      const yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

      const drawGenderAndAge = () => {
        const svg = d3
          .select(ref.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

        x.domain(age);
        y.domain([
          0,
          d3.max(totalAgeDeaths) - parseInt(d3.max(totalAgeDeaths) / 2.5),
        ]);

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
          .text("Deaths by Age Range and Gender");

        var scatterTipGenderAge = d3.select("body").append("div")
          .attr("class", "scatter-info")
          .style("opacity", 0);

        let data_indexer = null;

        var dict = new Map();

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
                dict.set(d,[internal_indexer,data_indexer]);
                return `ageBar${parseInt(
                  data_indexer.toString() + internal_indexer.toString()
                )}`;
              })
              .attr("x", function (d) {
                if (internal_indexer === 0) {
                  return x(age[data_indexer]);
                } else {
                  return x(age[data_indexer]) + 15;
                }
              })
              .attr("y", function (d) {
                return y(d);
              })
              .attr("width", x.rangeBand())
              .attr("height", (d) => height - y(d))
              .attr("fill", function (d) {
                if (internal_indexer === 0) { //male
                  return "#a17724";
                } else {
                  return "#939cc2"; //female
                }
              })
              .on("mouseover", function(d,i){
                scatterTipGenderAge.transition()
                .duration('50')
                .attr('opacity','.85');
                scatterTipGenderAge.transition()
                .duration(50)
                .style("opacity",'1');
                scatterTipGenderAge.html(d)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");

                PlotMap(deathMap.filter(iter => iter.age.toString() === dict.get(d)[1].toString() && iter.gender.toString() === dict.get(d)[0].toString() ));
              })
              .on("mouseout",function(d,i){
                scatterTipGenderAge.transition()
                .duration('50')
                .style("opacity", 0);

                PlotMap(deathMap);

                });
          });
        });
      };
      drawGenderAndAge();
    };
    d3.csv(deaths_age_sex, function (d_set) {
      let temp_set = [];
      let saver = 0;
      daysData.forEach(function (d) {
        let summer = 0;
        d_set.forEach(function (d_inner) {
          let pumpDist = undefined;
          pumpData.forEach(function (d_pump) {
            if (pumpDist === undefined) {
              pumpDist = Math.sqrt(((d_inner.x - d_pump.x)**2) + ((d_inner.y - d_pump.y)**2));
            }
            else if (pumpDist > Math.sqrt(((d_inner.x - d_pump.x)**2) + ((d_inner.y - d_pump.y)**2)) ) {
              pumpDist = Math.sqrt(((d_inner.x - d_pump.x)**2) + ((d_inner.y - d_pump.y)**2));
            }
          })
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
              pumpdist: pumpDist
            });
            summer = summer + 1;
          }
        });
        saver = summer;
      });
      deathMap = temp_set
      PlotMap(temp_set);
      BarChart(temp_set);
    });
  }, []);
  return (
    <div>
      <svg ref={ref}></svg>
      <div className="legend">
        <div className="maleLabel">Male Deaths</div>
        <div className="femaleLabel">Female Deaths</div>
      </div>
    </div>
  );
};

const PlotMap = (dataPoints) => {
  const onMouseEnter = (d) => {
    d3.select(".tooltip").classed("showTooltip", true);
  };

  const onMouseMove = (d) => {
    d3.select(".tooltip")
      .html(`${gender[d.gender]}, ${age[d.age]}`)
      .style("left", `${d3.event.pageX - window.scrollX + 12}px`)
      .style("top", `${d3.event.pageY - window.scrollY - 18}px`);
  };

  const onMouseLeave = (d) => {
    d3.select(".tooltip").classed("showTooltip", false);
  };

  d3.select("#deaths").selectAll("circle").remove();

  d3.select("#deaths")
    .selectAll("circle")
    .data(dataPoints)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x * 45 - 45 * 3)
    .attr("cy", (d) => d.y * 45 - 45 * 3)
    .attr("class", (d) => `${gender[d.gender]} death`)
    .on("mouseenter", onMouseEnter)
    .on("mouseleave", onMouseLeave)
    .on("mousemove", onMouseMove);
};

const handleChange = (newValue) => {
  PlotMap(deathMap.filter(iter => iter.pumpdist <= newValue.toFixed(2) ));
}


const MainPage = (
  <div>
    <Row>
      <Col sm={6}>
        <div>
          <Row>
            <div
            style={{
              paddingLeft:"30px"
            }}>
              Pump Distance Slider
          <SliderInput min={0} max={5} step={0.5} onChange={handleChange}>
            <SliderTrack>
          {new Array(11).fill("x").map((x, index) => (
          <SliderMarker value={index * 0.5}>
            <span>{index * 0.5}</span>
            <SliderTrackHighlight />
          </SliderMarker>
            ))}
            </SliderTrack>
          </SliderInput>
          </div>
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
          <InitBarChart />
        </Row>
      </Col>
    </Row>
  </div>
);

export default MainPage;
