import React from 'react';
import Card from "react-bootstrap/Card"
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';

function UserCard({ user }) {       

  return <div>
      <Card>
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
          <Typography>{user.firstName} {user.lastName}</Typography>          
      </Card>
  </div>;
}

export default UserCard;
