import { React, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserCard from "./UserCard";
import API from "../apiHelper"
function SearchUser() {
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    if (searchUser) {
      const response = await API.GET(`user/search/${searchUser}`)
      if (response) {
        setUsers(response)
      }                
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
