import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Loading from "./Loading";
import MainHeader from "./MainHeader";
import API from "../apiHelper"

const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [apiData, setApiData] = useState(null);

  const isValidInput = () => {    
    if (!username) setError("Enter a username");
    else if (!password) setError("Enter a password");
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
      const body= JSON.stringify({
        "username":username,
        "password":password
      })   
      const response = await API.POST('login', body)
      if (response) {
        if (response.message) {
          setError(response.message);
        } else {
          setApiData(response);
          setSuccess(true);            
          localStorage.setItem("auth", response.accessToken)
          localStorage.setItem("user", JSON.stringify(response.user))
        }
        setIsLoading(false);
        navigate("/home");
      }
    }
  }
  return (
    <div className="p-4 align-self-center border rounded">
      <MainHeader title="Login"></MainHeader>
      {isLoading
        ? <Loading />
        :      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        {error && <Alert variant="danger">{error}</Alert>}
        {success && !error && (
          <Alert variant="success">Welcome {apiData.username}!</Alert>
        )}
        <div className="d-grid gap-2">
          <Button className="btn-lg" variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
      }
    </div>
  );
};
export default LoginForm;
