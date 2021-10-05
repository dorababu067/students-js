import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Row, ListGroup } from "react-bootstrap";

function Dashboard(props) {
  return (
    <>
      <Row>
        <Col md={2}>
          <ListGroup as="ul">
            <ListGroup.Item as={NavLink} exact to="/students">
              students
            </ListGroup.Item>
            <ListGroup.Item as={NavLink} exact to="/add/students">
              Add Student
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={10}>{props.children}</Col>
      </Row>
    </>
  );
}

export default Dashboard;
