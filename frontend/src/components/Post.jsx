import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FeedContext } from "../pages/Feed";
import PostHeader from "./Post/Header";
import PostFooter from "./Post/Footer";
import PostBody from "./Post/Body";
import PostTimestamp from "./Post/Timestamp";
import Card from "react-bootstrap/Card";
import API from "../apiHelper";
function Post({ post }) {
  const [userLiked, setUserliked] = useState(false);
  const [likecount, setLikecount] = useState(post.likes);
  const setPosts = useContext(FeedContext);
  const navigate = useNavigate();

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
    <div>
      <Card className="p-2 mb-2">
        <div onClick={goToUserProfile}>
          <PostHeader username={post.username} avatar_url={post.avatar_url} />
        </div>
        <div onClick={handleClick}>
          <PostBody body={post.post} />
          <PostTimestamp timestamp={post.created_at} />
        </div>
        <PostFooter />
      </Card>
    </div>
  );
}

export default Post;
