import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {FeedContext} from "../pages/Feed"
import PostHeader from "./Post/Header"
import PostFooter from "./Post/Footer"
import PostBody from "./Post/Body"
import PostTimestamp from "./Post/Timestamp"

function Post({ post }) {
  const [userLiked, setUserliked] = useState(false);
  const [likecount, setLikecount] = useState(post.likes);
  const setPosts = useContext(FeedContext)
  const navigate = useNavigate()

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

  const handleClick = () => {
    navigate(`/post/${post.post_id}`)    
  }

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
        <PostHeader username={post.username} avatar_url={post.avatar_url}/>        
        <div onClick={handleClick}>
          <PostBody body={post.post}/>  
          <PostTimestamp timestamp={post.created_at}/>                  
        </div>
        <PostFooter/>        
      </div>
    </div>
  );
}

export default Post;
