import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import student from "../../services/student";

function UpdateStudent(props) {
  const { schoolId, studentId } = useParams();
  const history = useHistory();
  const [singleStudent, setStudent] = useState();

  // API Call for Update data
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await student.update(schoolId, studentId, singleStudent);
    history.push(`/schools/${schoolId}/students/${studentId}`);
  };

  function onchangeHandler(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }
  // console.log(student);

  // API call for get the student details
  const getStudent = async () => {
    const response = await student.retrieve(schoolId, studentId);
    setStudent(response.data);
  };

  useEffect(() => {
    // API call getting student details
    getStudent();
  }, []);
  return (
    <>
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
            value={singleStudent?.name}
            defaultValue={singleStudent?.name}
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
            value={singleStudent?.age}
            defaultValue={singleStudent?.age}
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
            value={singleStudent?.address}
            defaultValue={singleStudent?.address}
          />
        </div>
        <br></br>
        <input
          type="submit"
          className="btn btn-primary"
          value="Update Student"
        ></input>
      </form>
    </>
  );
}
export default UpdateStudent;
