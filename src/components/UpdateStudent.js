import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "./axios";
import Dashboard from "./Dashboard";

function UpdateStudent(props) {
  const { id } = useParams();
  const history = useHistory();
  const [student, setStudent] = useState();

  // API Call for Update data
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.put(`/students/${id}/`, student);
    history.push("/students/");
  };

  function onchangeHandler(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }
  // console.log(student);

  // API call for get the student details
  const getStudent = async () => {
    const response = await axios.get(`/students/${id}`);
    setStudent(response.data);
  };

  useEffect(() => {
    // API call getting student details
    getStudent();
  }, []);
  return (
    <Dashboard>
      <h4>Update Student Details</h4>
      <hr></hr>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name" className="form-label mt-4">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Student name"
            name="name"
            onChange={onchangeHandler}
            value={student?.name}
            defaultValue={student?.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age" className="form-label mt-4">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Student age"
            name="age"
            onChange={onchangeHandler}
            value={student?.age}
            defaultValue={student?.age}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label mt-4">
            Address
          </label>
          <input
            type="textarea"
            className="form-control"
            placeholder="Student address"
            name="address"
            onChange={onchangeHandler}
            value={student?.address}
            defaultValue={student?.address}
          />
        </div>
        <br></br>
        <input
          type="submit"
          className="btn btn-primary"
          value="Update Student"
        ></input>
      </form>
    </Dashboard>
  );
}
export default UpdateStudent;
