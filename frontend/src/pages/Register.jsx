import React, { Component } from "react";
import RegisterForm from "../components/RegisterForm";
import Container from "react-bootstrap/Container"
export default function Login() {  
    return (
      <Container className="w-50 pt-4 pb-4">
        <RegisterForm/>
      </Container>
    );  
}
