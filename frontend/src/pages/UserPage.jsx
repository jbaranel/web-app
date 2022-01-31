import { React, useState, useEffect } from "react";
import ProfileCard from "../components/User/ProfileCard";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading"
import List from "../components/User/FollowList"
import "../components/styles/Main.css"
import API from "../apiHelper"
import UserCard from "../components/UserCard"
function UserPage() {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const user_id = location.pathname.split("user/")[1];

  const getUser = async () => {
    setIsLoading(true);
    const response = await API.GET(`user/${user_id}`)
    if (response) {
      setUser(response)
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return <div>
    <div className="main-container">
      {isLoading ? <Loading /> : 
      <>
      <ProfileCard user={user} />
      <h3>Followers</h3>
      {user.followers.length ? (
      user.followers.map((follower, index) => {
        return <UserCard user={follower} key={index}/>
      })) 
      : (
      <div>No results</div>)}        
      </>
      }
    </div>
  </div>;
}

export default UserPage;
