import React, { Component } from "react";
import MarkDownDoc from "../assets/documentation.md";
import ReactMarkdown from "react-markdown";
import { Row, Col } from "react-bootstrap";

class DocumentationPage extends Component {
  constructor() {
    super();
    this.state = { markdown: "" };
  }

  componentWillMount() {
    fetch(MarkDownDoc)
      .then((res) => res.text())
      .then((text) => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    return (
      <div>
        <Row>
          <Col sm={1}></Col>
          <Col sm={10}>
            <ReactMarkdown source={markdown} />
          </Col>
          <Col sm={1}></Col>
        </Row>
      </div>
    );
  }
}

export default DocumentationPage;
