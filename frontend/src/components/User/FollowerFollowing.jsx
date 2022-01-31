import React from "react";
import { Typography } from "@mui/material";
function FollowerFollowing({ followers, following }) {
  return (
    <div>        
      <span className="m-0">
        {followers.length} Following        
      </span>
      <span>
      {following.length} Followers 
      </span>
    </div>
  );
}

export default FollowerFollowing;
