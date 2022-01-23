import {React, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function LikeButton({liked}) {
  return (!!liked ? <div>
      <IconButton>
        <FavoriteIcon style={{ 'color': "red" }}/>
    </IconButton>
  </div> :
    <IconButton>
        <FavoriteBorderIcon style={{ 'color': "red" }}/>
    </IconButton>
)}

export default LikeButton;
