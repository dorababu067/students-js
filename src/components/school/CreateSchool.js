import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import school from "../../services/school";
import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

function CreateSchool() {
  const history = useHistory();
  const [serverErrors, setServerErrors] = useState({});

  const schoolSchema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    validationSchema: schoolSchema,
    onSubmit: async (values) => {
      try {
        await school.create(values);
        history.push("/schools/");
      } catch (error) {
        setServerErrors(error);
      }
    },
  });

  return (
    <>
      {serverErrors.non_field_errors && (
        <Alert variant="danger">{serverErrors.non_field_errors[0]}</Alert>
      )}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="School Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Form.Text className="text-danger">
            {formik.errors && formik.errors.name && formik.errors.name}
          </Form.Text>
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
          <Form.Text className="text-danger">
            {formik.errors && formik.errors.address && formik.errors.address}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default CreateSchool;
