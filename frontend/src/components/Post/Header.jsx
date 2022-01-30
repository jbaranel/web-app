import React from "react";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";

function Header( {avatar_url, username} ) {
  return (
    <div>
      <div className="d-flex flex-row mb-2 align-items-center">
        <div className="mx-2">
          {avatar_url ? (
            <Avatar
              alt="Profile Picture"
              src={avatar_url}
              sx={{ width: 52, height: 52 }}
            />
          ) : (
            <Avatar sx={{ bgcolor: "grey" }}>
              {JSON.stringify(username)}
            </Avatar>
          )}
        </div>
        <div className="mx-2">
          <Typography className="m-0" variant="h5" gutterBottom component="div">
            @{username}
          </Typography>
        </div>       
      </div>
    </div>
  );
}

export default Header;
