import React from "react";
import LoginForm from "../components/LoginForm";
import Container from "react-bootstrap/Container"
export default function Login() {  
    return (
      <Container className="w-50 pt-4 pb-4">
        <LoginForm/>
      </Container>
    );  
}