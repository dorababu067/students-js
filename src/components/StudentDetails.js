import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "./axios";
import Dashboard from "./Dashboard";

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const history = useHistory();
  console.log(id);

  const getStudent = async () => {
    const response = await axios.get(`/students/${id}/`);
    console.log(response.data);
    setStudent(response.data, "api call response");
  };

  function updateHandler() {
    history.push({
      pathname: "/update/students/" + id,
    });
  }

  // delete student
  function deleteHandler() {
    const deleteStudent = async () => {
      const response = await axios.delete(`/students/${id}/`);
      history.push("/students/");
    };
    deleteStudent();
  }

  useEffect(() => {
    // API call getting student details
    getStudent();
  }, []);
  return (
    <Dashboard>
      <h4>Student Details</h4>
      <hr></hr>
      {student ? (
        <>
          <p>Name :{student.name} </p>
          <p>Age : {student.age}</p>
          <p>Address:{student.address}</p>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      <input
        type="button"
        onClick={updateHandler}
        className="btn btn-primary"
        value="Update"
      ></input>
      <input
        type="button"
        onClick={deleteHandler}
        className="btn btn-danger"
        value="Delete"
      ></input>
    </Dashboard>
  );
}

export default StudentDetails;
