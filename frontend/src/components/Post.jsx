import { React, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { FeedContext } from "../pages/Feed";
import PostHeader from "./Post/Header";
import PostFooter from "./Post/Footer";
import PostBody from "./Post/Body";
import PostTimestamp from "./Post/Timestamp";
import Card from "react-bootstrap/Card";
import API from "../apiHelper";
import {getUser} from '../utils'
import '../components/styles/Main.css'
export const PostContext = createContext()

function Post({ post }) {

  const { username } = getUser()
  const [userLiked, setUserliked] = useState(post.likes.find((like) => {
    return like.username === username
  }));
  
  const [likecount, setLikecount] = useState(post.likes.length);
  const navigate = useNavigate();  
  
  const handleClick = () => {
    navigate(`/post/${post.post_id}`);
  };
  const goToUserProfile = () => {
    navigate(`/user/${post.username}`);
  };

  const deletePost = async () => {
    const body = JSON.stringify({
      username: post.username,
    });
    const response = await API.DELETE(`post/${post.post_id}`, body);
  };

  return (
    <PostContext.Provider value={{post, likecount, setLikecount, userLiked, setUserliked}}>
      <Card className="p-3 mb-2">
        <div className="user_header" onClick={goToUserProfile}>
          <PostHeader username={post.username} avatar_url={post.avatar_url} />
        </div>
        <div className= "clickable_div" onClick={handleClick}>
          <PostBody body={post.post} />
          <PostTimestamp timestamp={post.created_at} />
        </div>
        <div>
         <PostFooter />
        </div>
      </Card>
    </PostContext.Provider>
  );
}

export default Post;
