import {React, useState} from "react";
import Card from "react-bootstrap/Card";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import Button from "react-bootstrap/Button";
import API from "../apiHelper";
import { useNavigate} from "react-router-dom"
import "../components/styles/Main.css"

function UserCard({ user, following, userFollowing, setFollowing }) {
  const navigate = useNavigate()

  const [unfollow, setUnfollow] = useState('Following')

  const followerUser = async () => {
    const response = await API.POST(`user/${user.username}/follow`);
    setFollowing([...userFollowing, user])
  };
  
  const unfollowerUser = async () => {
    const response = await API.DELETE(`user/${user.username}/follow`);
    const newUserFollowing = userFollowing.filter((item) => user !== item)
    setFollowing([...newUserFollowing])  };

  const goToUserProfile = () => {
    navigate(`/user/${user.username}`);
  };

  function MouseOver(event) {
    //event.target.style.background = 'red';
    setUnfollow('Unfollow')
  }
  function MouseOut(event){
    //event.target.style.background="";
    setUnfollow('Following')
  }

  return (
    <div>
      <Card className="p-2">
        <div className="d-flex justify-content-between">
          <div className="w-50" onClick={goToUserProfile}>
            <div className="d-flex flex-row mb-2 align-items-center">
              <div className="mx-2">
                {user.avatar_url ? (
                  <Avatar
                    alt="Profile Picture"
                    src={user.avatar_url}
                    sx={{ width: 52, height: 52 }}
                  />
                ) : (
                  <Avatar sx={{ bgcolor: "grey" }}>
                    {JSON.stringify(user.username).charAt(1)}
                  </Avatar>
                )}
              </div>
              <div className="mx-2">
                <Typography
                  className="m-0"
                  variant="h5"
                  gutterBottom
                  component="div"
                >
                  {user.username}
                </Typography>
              </div>
            </div>
          </div>
          <div className="w-50 d-flex justify-content-end mb-3">
            {following ? (
              <div onMouseOver={MouseOver} onMouseOut={MouseOut} className="pill_button_dark" onClick={unfollowerUser}>{unfollow}</div>
            ) : (
              <div className="pill_button" onClick={followerUser}>Follow</div>
            )}
          </div>
        </div>
        <Typography variant="subtitle">
          {user.firstName} {user.lastName}
        </Typography>
      </Card>
    </div>
  );
}

export default UserCard;
