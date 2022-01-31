import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Loading from "../components/Loading";
import FollowerFollowing from "./User/FollowerFollowing";
import API from "../apiHelper"

function ProfileCard() {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    setIsLoading(true);
    const response = await API.GET("user")
    if (response) {
      setUser(response);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <div>
              <div>
                <h1 className="text-center">
                  {user.firstName} {user.lastName}
                </h1>
                <h3 className="text-center">@{user.username}</h3>
              </div>
              <div align="center">
                <Avatar
                  alt="Profile Picture"
                  src={user.avatar_url}
                  sx={{ width: 128, height: 128 }}
                />
              </div>
              <FollowerFollowing
                followers={user.followers}
                following={user.following}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
