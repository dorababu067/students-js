import React, { useEffect, useState, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "../../components/axios";
import Dashboard from "../../components/Dashboard";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import student from "../../services/student";

function Students() {
  const auth = useContext(AuthContext);
  const { id } = useHistory();
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const response = await student.list(id);
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
