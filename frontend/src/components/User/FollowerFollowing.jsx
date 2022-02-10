import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
function FollowerFollowing({ followers, following }) {
  return (
    <div>
      <Link to={'following'}>
      <span className="m-0">
        {following.length} Following        
      </span>
      </Link>
      <Link to={'followers'}>
      <span>
      {followers.length} Followers 
      </span>
      </Link>
    </div>
  );
}

export default FollowerFollowing;
