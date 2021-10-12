import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import school from "../../services/school";
import { useHistory } from "react-router";
import { Plus } from "@styled-icons/fa-solid/Plus";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import { useFormik } from "formik";

function Schools() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [schools, setSchools] = useState([]);
  const [getSchool, setSchool] = useState({ name: "", address: "" });

  // get all schools
  const getSchools = async () => {
    const response = await school.list();
    setSchools(response.data);
  };

  useEffect(() => {
    getSchools();
  }, []);

  // modal related
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setSchool(row);
    setShow(true);
  };

  // update school
  const formik = useFormik({
    initialValues: {
      name: getSchool.name,
      address: getSchool.address,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await school.update(getSchool.id, values);
      getSchools();
    },
  });

  // delete school
  const deleteHandler = async (schoolId) => {
    console.log(schoolId, "School ID");
    await school.delete(schoolId);
    getSchools();
  };
  return (
    <>
      <Button
        variant="primary"
        className="d-flex align-items-center ms-auto mb-2"
        onClick={() => {
          history.push("/create/schools/");
        }}
      >
        <Plus size={20} style={{ marginRight: "10px" }} /> School
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auth.loggedIn &&
            schools.length > 0 &&
            schools.map((school) => {
              return (
                <tr key={school.id}>
                  <td>{school.id}</td>
                  <td>{school.name}</td>
                  <td>{school.address}</td>
                  <td>
                    <Edit
                      size={20}
                      style={{ marginRight: "10px", color: "green" }}
                      onClick={() => handleShow(school)}
                    />
                    <Delete
                      size={20}
                      style={{ color: "red" }}
                      onClick={() => deleteHandler(school.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {getSchool && (
        <Modal show={show} onHide={handleClose} centered>
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Header>
              <Modal.Title>Update {getSchool.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="School Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  rows={5}
                  placeholder="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default Schools;
