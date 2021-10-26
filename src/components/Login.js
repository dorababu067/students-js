import React, { useState, useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Login() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  // react hook form
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmitHandler = async (data) => {
    // API call save the student data
    await auth.login(data);
    history.push("/schools");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onsubmitHandler)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="=text"
            name="username"
            placeholder="Enter username"
            {...register("username")}
          />
          <Form.Text className="text-danger">
            {errors.username?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            {...register("password")}
          />
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
          {auth.loading && (
            <Spinner
              animation="border"
              variant="light"
              size="sm"
              className="ms-2"
            />
          )}
        </Button>
      </Form>
    </>
  );
}

export default Login;
