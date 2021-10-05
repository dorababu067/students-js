import React, { useEffect, useState, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "./axios";
import Dashboard from "./Dashboard";
import { AuthContext } from "../context/authContext";

function Students() {
  const auth = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const response = await axios.get("/students/");
    setStudents(response.data);
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <Dashboard>
      {auth.loggedIn &&
        students.length > 0 &&
        students.map((student) => {
          return (
            <h6 key={student.id}>
              <ListGroup>
                <ListGroup.Item>
                  <NavLink exact to={`/students/${student.id}`}>
                    {student.name}
                  </NavLink>
                </ListGroup.Item>
              </ListGroup>
            </h6>
          );
        })}
    </Dashboard>
  );
}
export default Students;
