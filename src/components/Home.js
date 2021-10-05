import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import Login from "./Login";
import students from "../assets/images/students.jpg";

function Home() {
  return (
    <>
      <Row>
        <Col md={6}>
          <Image src={students} fluid />
        </Col>
        <Col md={6}>
          <Login />
        </Col>
      </Row>
    </>
  );
}

export default Home;
