import React from "react";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

function Footer() {
  const userLiked = false;
  return (
    <div>
      <div>
        <div className="d-flex flex-row align-items-center">
          <IconButton aria-label="Vote for this event">
            <FaRegHeart style={{ color: "red" }} />
          </IconButton>
          <IconButton>
            <FaRegComment />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Footer;
