import { React, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserCard from "./UserCard";
import API from "../apiHelper"
import useFetch from '../hooks/useFetch'
import {getUser} from '../utils'
import userApi from '../api/user'

function SearchUser() {
  const [searchUser, setSearchUser] = useState("");

  const user = getUser()
  const { response: userFollowing, setResponse: setFollowing, refetch: fetchUser } = useFetch(userApi.getUserFollowing, user.username);

  const { response: users, setResponse: setUsers, loading, refetch: getUsers } = useFetch(userApi.searchUsers, searchUser);
  
  const handleSubmit = (event) => {
    event.preventDefault();
  }

    useEffect(() => {
      if (searchUser) {
        getUsers()
        fetchUser()
      }
      else {
        setUsers([])
      }
    }, [searchUser])

  return (
    <div>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search user"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </Form.Group>
        <button className="pill_button" variant="primary" type="submit">
          Search
        </button>
      </Form>
      {users?.length ? (
      users.map((user, index) => {
        const following = !!userFollowing.find(following => following.username === user.username)
        return <UserCard following={following} userFollowing={userFollowing} setFollowing={setFollowing} user={user} key={index}/>
      })) 
      : searchUser && (
      <div>No results</div>)}       
    </div>
  );
}

export default SearchUser;
