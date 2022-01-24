import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Avatar from "@mui/material/Avatar"
import Button from "react-bootstrap/Button"

export default function NavBar() {

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
  }
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/#">My App Name</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/profile">
              <div className="d-flex justify-content-start"> 
              Profile
                <span className="mx-2">
                  <Avatar alt="Profile Picture" src="https://mui.com/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }}/>
                </span>
              </div>              
              </Nav.Link>
          </Nav>
            <Button variant="dark" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>
    </div>
  );
}
