import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Loading from "./Loading";
import MainHeader from "./MainHeader";

//TODO need to add password in frontend and api

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [apiData, setApiData] = useState(null);

  const isValidInput = () => {
    if (!firstName) setError("Enter a first name");
    else if (!lastName) setError("Enter a last name");
    else if (!password) setError("Enter a password");
    else if (password != confirmPassword) setError("Password do not match");
    else return true;
    return false;
  };
  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValidInput()) {
      return;
    } else {
      setError(null);
      setIsLoading(true);
      try {
        let payload = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password
          }),
        };
        let response = await fetch(
          `${process.env.REACT_APP_API_URL}/register`,
          payload
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              setError(data.message);
            } else {
              setApiData(data);
              setSuccess(true);
              localStorage.setItem("auth", data.accessToken)
            }
            setIsLoading(false);
          });
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
  }
  return (
    <div class="p-4 align-self-center border rounded">
      <MainHeader title="Sign Up"></MainHeader>
      {isLoading
        ? <Loading />
        :      
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && !error && (
          <Alert variant="success">Welcome {apiData.firstName}!</Alert>
        )}
        <div className="d-grid gap-2">
          <Button className="btn-lg" variant="primary" type="submit">
            Create Account
          </Button>
        </div>
      </Form>
      }
    </div>
  );
};
export default RegisterForm;
