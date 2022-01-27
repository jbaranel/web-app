import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchUser() {
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState("");

  const getUser = async () => {
    const token = localStorage.getItem("auth")
    let payload = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },           
      };
      let user = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${searchUser}`,
        payload
      ).then(res => res.json())                   
      setUser(user)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    getUser()
    console.log(user)

};

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search user"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchUser;
