import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Loading from "../components/Loading";
import FollowerFollowing from "./User/FollowerFollowing";
import userApi from '../api/user'
import useFetch from "../hooks/useFetch";
import {getUser} from '../utils'

function ProfileCard() {

  const { username } = getUser()
  const { response: user, loading } = useFetch(userApi.getUser, username);
  
  return (
    <div>
      {loading ? (
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
