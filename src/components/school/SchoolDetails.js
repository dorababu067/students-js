import React, { useEffect, useState } from "react";
import school from "../../services/school";
import studentService from "../../services/student";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useHistory } from "react-router-dom";
import { Plus } from "@styled-icons/fa-solid/Plus";
import { Button } from "react-bootstrap";

function SchoolDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [singleSchool, setSingleSchool] = useState({});
  const [students, setStudents] = useState([]);

  const getSchool = async () => {
    const response = await school.retrieve(id);
    setSingleSchool(response.data);
  };
  //   get school students
  const getSchoolStudents = async () => {
    const response = await studentService.list(id);
    setStudents(response.data);
  };
  useEffect(() => {
    getSchool();
    getSchoolStudents();
  }, []);
  const rowClickedHandler = (row) => {
    history.push(`/schools/${id}/students/${row.id}/`);
  };

  //students data
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
  ];

  return (
    <>
      {singleSchool && (
        <div className="d-flex">
          <div className="me-5">
            <img src="https://source.unsplash.com/500x300/?school" />
          </div>
          <div>
            <h2>{singleSchool.name} Details</h2>
            <p>Name : {singleSchool.name}</p>
            <p>Address :{singleSchool.address}</p>
          </div>
        </div>
      )}
      <Button
        variant="primary"
        className="d-flex align-items-center ms-auto mb-2"
        onClick={() => {
          history.push(`/add/schools/${singleSchool.id}/students`);
        }}
      >
        <Plus size={20} style={{ marginRight: "10px" }} /> Students
      </Button>
      {students && students.length > 0 && (
        <DataTable
          title="Students Details"
          columns={columns}
          data={students}
          highlightOnHover={true}
          onRowClicked={rowClickedHandler}
          pagination
        />
      )}
    </>
  );
}

export default SchoolDetails;
