import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import student from "../services/student";

function AddStudent() {
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    age: "",
    address: "",
    school: 1,
  });
  const [error, setError] = useState({});

  function onchangeHandler(e) {
    setState((preState) => ({ ...preState, [e.target.name]: e.target.value }));
  }

  const saveStudents = async () => {
    try {
      await student.create(null);
      history.push("/students/");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  function onsubmitHandler(e) {
    e.preventDefault();
    // API call save the student data
    saveStudents();
  }
  return (
    <Dashboard>
      <h4>Add New Student</h4>
      <hr></hr>
      <form onSubmit={onsubmitHandler}>
        <div className="form-group">
          <label htmlFor="name" className="form-label mt-4">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${error.name ? "is-invalid" : null}`}
            placeholder="Student name"
            name="name"
            onChange={onchangeHandler}
          />
          <p className="text-danger">{error.name ? error.name[0] : null}</p>
        </div>

        <div className="form-group">
          <label htmlFor="age" className="form-label mt-4">
            Age
          </label>
          <input
            type="number"
            className={`form-control ${error.age ? "is-invalid" : null}`}
            placeholder="Student age"
            name="age"
            onChange={onchangeHandler}
          />
          <p className="text-danger">{error.age ? error.age[0] : null}</p>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label mt-4">
            Address
          </label>
          <input
            type="textarea"
            className={`form-control ${error.address ? "is-invalid" : null}`}
            placeholder="Student address"
            name="address"
            onChange={onchangeHandler}
          />
          <p className="text-danger">
            {error.address ? error.address[0] : null}
          </p>
        </div>
        <br></br>
        <input
          type="submit"
          className="btn btn-primary"
          value="Save Student"
        ></input>
      </form>
    </Dashboard>
  );
}

export default AddStudent;
