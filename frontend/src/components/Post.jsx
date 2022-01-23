import {React, useState} from 'react';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import LikeButton from './LikeButton';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Post({post}) {
    const [postLiked, setPostLiked] = useState(post.liked)
    
  return <div>
      <div class="border border-top-0 p-3">        
      <div class="d-flex flex-row mb-2">
        {post.avatar ? 
        <Avatar alt="Profile Picture" src={post.avatar} sx={{ width: 52, height: 52 }}/>
        :
        <Avatar sx={{ bgcolor: "grey" }}>{JSON.stringify(post.username).charAt(1).toUpperCase()}</Avatar>}
        <Typography variant="h5" gutterBottom component="div">
        @{post.username}
        </Typography>    
        {true ?
        <IconButton>
          <MoreHorizIcon/>
        </IconButton>
        :
        <>Not user</>
        }    
      </div>
      <Typography variant="body1" gutterBottom>
        {post.post}
      </Typography>      
      <Typography variant="caption" display="block" gutterBottom>
        {post.createdAt}
      </Typography>
      <LikeButton liked={postLiked}/>
      </div>
  </div>;
}

export default Post;
