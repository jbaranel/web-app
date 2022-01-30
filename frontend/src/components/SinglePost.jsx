import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FeedContext } from "../pages/Feed";
import PostTimestamp from "./Post/Timestamp";
import PostHeader from "./Post/Header";
import PostFooter from "./Post/Footer";
import PostBody from "./Post/Body";
import Card from "react-bootstrap/Card"
function SinglePost({ post }) {
  return (
    <div>
      <Card className="p-2 mt-3">
        <PostHeader username={post.username} avatar_url={post.avatar_url} />
        <PostBody body={post.post} />
        <PostTimestamp timestamp={post.created_at} />
        <PostFooter/>
      </Card>
    </div>
  );
}

export default SinglePost;
