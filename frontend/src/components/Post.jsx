import { React, useState, useContext } from "react";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import LikeButton from "./LikeButton";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import {FeedContext} from "../pages/Feed"

function Post({ post }) {
  const [userLiked, setUserliked] = useState(false);
  const [likecount, setLikecount] = useState(post.likes);
  const { setPosts } = useContext(FeedContext)

  const updateLikes = () => {
    if (userLiked) {
      setLikecount(likecount - 1);
      setUserliked(false);
    } else {
      setLikecount(likecount + 1);
      setUserliked(true);
    }
    return;
  };

  const deletePost = () => {
    const token = localStorage.getItem("auth")
    try {
      let payload = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          username: post.username,
        }),
      };
      let response = fetch(
        `${process.env.REACT_APP_API_URL}/post/${post.post_id}`,
        payload
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            console.log(data.message);
          } else {
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="border border-top-0 p-3">
        <div className="d-flex flex-row mb-2 align-items-center">
          <div className="mx-2">
            {post.avatar_url ? (
              <Avatar
                alt="Profile Picture"
                src={post.avatar_url}
                sx={{ width: 52, height: 52 }}
              />
            ) : (
              <Avatar sx={{ bgcolor: "grey" }}>
                {JSON.stringify(post.username)}
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
              @{post.username}
            </Typography>
          </div>
          <div className="ml-auto p-2">
            {true ? (
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            ) : (
              <>Not user</>
            )}
          </div>
        </div>
        <Typography variant="body1" gutterBottom>
          {post.post}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {post.created_at}
        </Typography>
        <IconButton aria-label="Vote for this event" onClick={updateLikes}>
          {userLiked ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon style={{ fill: "red" }} />
          )}
        </IconButton>
        <Typography variant="body2" gutterBottom>
          Likes:{likecount}
        </Typography>

        <IconButton onClick={deletePost}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Post;
