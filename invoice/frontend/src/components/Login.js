import React, { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../config/MyService";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const login = (event) => {
    event.preventDefault();
    userLogin(data).then((res) => {
      if (res.data.flag === 1) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert(res.data.message);
        navigate("/dashboard");
      } else if (res.data.flag === 0) {
        alert(res.data.message);
      } else if (res.data.err === 0) {
        alert(res.data.message);
      }
    });
  };

  return (
    <div
      className="container row card mx-auto"
      style={{
        width: "500px",
        height: "500px",
        marginTop: "30px",
      }}
    >
      <br />
      <br />
      <h1 className="text-center">LOGIN</h1>
      <Form onSubmit={(e) => login(e)}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            onChange={handler}
          />
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handler}
          />
        </Form.Group>
        <br />
        <br />
        <div className="text-center">
          <input
            type="submit"
            value="LOGIN"
            className="btn btn-dark text-center"
          />
        </div>
        <p
          className="text-center"
          onClick={() => {
            navigate("/register");
          }}
        >
          <br />
          CLICK HERE TO REGISTER
        </p>
      </Form>
    </div>
  );
}
