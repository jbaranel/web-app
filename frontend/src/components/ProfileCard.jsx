import {React, useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar"
import Loading from "../components/Loading"


function ProfileCard() {
    const [user, setUser] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const getUser = async () => {
        setIsLoading(true)
        const token = localStorage.getItem("auth")
        let payload = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },           
          };
          let user = await fetch(
            `${process.env.REACT_APP_API_URL}/user`,
            payload
          ).then(res => res.json())                   
          setUser(user)
          setIsLoading(false)
    }
    useEffect (() => {
        getUser()

    }, [])

  return <div>
       {isLoading
        ? <Loading />
        :
        <>
          <div className="d-flex justify-content-center">
            <h1>{user.firstName} {user.lastName}</h1>
            <Avatar alt="Profile Picture" src={user.avatar_url} sx={{ width: 128, height: 128 }}/>
            <ul>
                {/* Following: {user.following.map((follow, index) => {return <li key={index}>{follow}</li>})} */}
            </ul>
          </div>
        </>}          
  </div>;
}

export default ProfileCard;
