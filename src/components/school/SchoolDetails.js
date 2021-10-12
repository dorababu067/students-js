import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import school from "../../services/school";
import studentService from "../../services/student";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";

function SchoolDetails() {
  const { id } = useParams();
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
        <Card style={{ width: "18rem", marginBottom: "10px" }}>
          <Card.Img
            variant="top"
            src="https://source.unsplash.com/300x150/?school"
          />
          <Card.Body>
            <Card.Title>{singleSchool.name} Details</Card.Title>
            <p>Name : {singleSchool.name}</p>
            <p>Address :{singleSchool.address}</p>
          </Card.Body>
        </Card>
      )}

      {students && students.length > 0 && (
        <DataTable
          title="Students Details"
          columns={columns}
          data={students}
          pagination
        />
      )}
    </>
  );
}

export default SchoolDetails;
