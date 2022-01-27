import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postUsers } from "../config/MyService";

const regForName = /^[A-Za-z]/;
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForUsername = RegExp(/^[a-z0-9_-]{3,15}$/);
const regForPassword = RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{4,8}$/);

export default function Registration() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    errors: {
      fname: "",
      lname: "",
      uname: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });
  const [data, setData] = useState({
    fname: "",
    lname: "",
    uname: "",
    email: "",
    password: "",
  });
  const onChangeUser = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case "fname":
        errors.fname = regForName.test(value) ? "" : "Only alphabets allowed";
        break;

      case "lname":
        errors.lname = regForName.test(value) ? "" : "Only alphabets allowed";
        break;

      case "uname":
        errors.uname = regForUsername.test(value)
          ? ""
          : "Atleast 3 characters required";
        break;

      case "email":
        errors.email = regForEmail.test(value) ? "" : "Email not valid";
        break;

      case "password":
        errors.password = regForPassword.test(value)
          ? ""
          : "At least one numeric and and One character";
        break;

      case "cpassword":
        errors.cpassword =
          document.getElementById("password").value === value
            ? ""
            : "Password and confirm password should be same";
        break;
      default:
        alert("PLEASE FILL FORM COMPLETELY");
    }
    setState({ errors, [name]: value });
    setData({ ...data, [name]: value });
  };

  const register = (event) => {
    event.preventDefault();
    if (validate(state.errors)) {
      let userdata = {
        fname: data.fname,
        lname: data.lname,
        uname: data.uname,
        email: data.email,
        password: data.password,
      };
      console.log(userdata);
      postUsers(userdata).then((res) => {
        if (res.data.flag === 1) {
          alert(res.data.message);
          navigate("/");
        } else if (res.data.flag === 0) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      });
    }
  };

  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  return (
    <div
      className="container mx-auto"
      style={{
        width: "600px",
        height: "550px",
        marginTop: "0px",
      }}
    >
      <Container>
        <br />
        <Card>
          <h2 className="text-center"> REGISTER HERE</h2>
          <br />
          <Form
            style={{ width: "400px", margin: "auto" }}
            onSubmit={(e) => register(e)}
          >
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="FIRST NAME"
                name="fname"
                onChange={onChangeUser}
              />
              <Form.Text>
                {state.errors.fname.length > 0 && (
                  <span style={{ color: "red" }}>{state.errors.fname}</span>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="LAST NAME"
                name="lname"
                onChange={onChangeUser}
              />
              <Form.Text>
                {state.errors.lname.length > 0 && (
                  <span style={{ color: "red" }}>{state.errors.lname}</span>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="uname"
                type="text"
                placeholder="USERNAME"
                onChange={onChangeUser}
              />
              <Form.Text>
                {state.errors.uname.length > 0 && (
                  <span style={{ color: "red" }}>{state.errors.uname}</span>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="text"
                placeholder="EMAIL ADDRESS"
                onChange={onChangeUser}
              />
              <Form.Text>
                {state.errors.email.length > 0 && (
                  <span style={{ color: "red" }}>{state.errors.email}</span>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                id="password"
                placeholder="PASSWORD"
                onChange={onChangeUser}
              />
              <Form.Text>
                {state.errors.password.length > 0 && (
                  <span style={{ color: "red" }}>{state.errors.password}</span>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="cpassword"
                type="password"
                placeholder="CONFRIM PASSWORD"
                onChange={onChangeUser}
              />
              <Form.Text>
                {state.errors.cpassword.length > 0 && (
                  <span style={{ color: "red" }}>{state.errors.cpassword}</span>
                )}
              </Form.Text>
            </Form.Group>
            <br></br>

            <div className="text-center">
              <Button variant="dark" type="submit">
                Submit
              </Button>
              <br></br>
              <Button
                variant="light"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                Already a USER ? Click Here
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
