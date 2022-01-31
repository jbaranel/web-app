import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import FollowerFollowing from "./FollowerFollowing";
import List from "./FollowList";
function ProfileCard({ user }) {
  return (
    <div>
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
          <div align="center">
            <FollowerFollowing
              followers={user.followers}
              following={user.following}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
