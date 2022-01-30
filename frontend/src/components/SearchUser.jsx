import { React, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserCard from "./UserCard";

function SearchUser() {
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    if (searchUser) {
      const token = localStorage.getItem("auth")
      let payload = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },           
        };
        let user = await fetch(
          `${process.env.REACT_APP_API_URL}/user/search/${searchUser}`,
          payload
        ).then(res => res.json())                   
        setUsers(user)
    }
    else {
      setUsers([])
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    getUser()
    console.log(users)
  }

    useEffect(() => {
      getUser()
    }, [searchUser])

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
      {users.length ? (
      users.map((user, index) => {
        return <UserCard user={user} key={index}/>
      })) 
      : searchUser && (
      <div>No results</div>)}       
    </div>
  );
}

export default SearchUser;
