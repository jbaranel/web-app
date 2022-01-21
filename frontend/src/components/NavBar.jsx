import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Avatar from "@mui/material/Avatar"

export default function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/#">My App Name</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/profile">
              <div class="d-flex justify-content-start"> 
              Profile
                <span class="mx-2">
                  <Avatar alt="Profile Picture" src="https://mui.com/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }}/>
                </span>
              </div>              
              </Nav.Link>
              <Nav.Link href="#/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
