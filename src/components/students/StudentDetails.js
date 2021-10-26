import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "../axios";
import student from "../../services/student";

import { Button } from "react-bootstrap";

function StudentDetails() {
  const { schoolId, studentId } = useParams();
  const [singleStudent, setStudent] = useState(null);
  const history = useHistory();

  const getStudent = async () => {
    const response = await student.retrieve(schoolId, studentId);
    setStudent(response.data);
  };

  function updateHandler() {
    history.push(`/update/schools/${schoolId}/students/${studentId}`);
  }

  // delete student
  function deleteHandler() {
    const deleteStudent = async () => {
      await student.delete(schoolId, studentId);
      history.push(`/schools/${schoolId}/`);
    };
    deleteStudent();
  }

  useEffect(() => {
    // API call getting student details
    getStudent();
  }, []);
  return (
    <>
      <h4>Student Details</h4>
      <hr></hr>
      {singleStudent && (
        <div className="d-flex">
          <div className="me-5">
            <img src="https://source.unsplash.com/500x300/?student" />
          </div>
          <div>
            <p>Name :{singleStudent.name} </p>
            <p>Age : {singleStudent.age}</p>
            <p>Address:{singleStudent.address}</p>
            <Button variant="primary" className="me-2" onClick={updateHandler}>
              Update
            </Button>
            <Button variant="danger" onClick={deleteHandler}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentDetails;
