import React from 'react';
import CommentHeader from "./Post/Header"
import CommentBody from "./Post/Body"
import Timestamp from "./Post/Timestamp"
import Card from "react-bootstrap/Card"

function Comments( { comment }) { 
  return <div>
    <Card className="p-2 mb-2">
      <CommentHeader avatar_url={comment.avatar_url} username={comment.username}/>
      <CommentBody body = {comment.comment} />
      <Timestamp timestamp = {comment.created_at} />
    </Card>
  </div>;
}

export default Comments;
