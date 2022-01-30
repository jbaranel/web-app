import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SinglePost from "../components/SinglePost";
import "../components/styles/Main.css";
import Container from "react-bootstrap/Container";
import Comments from "../components/Comments";
import CreateComment from "../components/CreateComment";
import Loading from "../components/Loading";

function PostPage() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("auth");
  const location = useLocation();
  const post_id = location.pathname.split('post/')[1];

  async function getPost() {
    setIsLoading(true);
    let payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/post/${post_id}`,
      payload
    )
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        alert("Cannot get post");
      });
    setIsLoading(false);
  }
  useEffect(() => {
    getPost();
  }, []);
  

  return (
    <div className="main-container">
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <SinglePost post={post} />

            <CreateComment post={post}/>
            <>
            {post.comments.length ? (              
             post.comments.map(comment => <Comments key={comment.comment_id} comment={comment}/>)
              )              
             : (
              <div>No comments</div>
            )}
            </>
          </>
        )}
      </Container>
    </div>
  );
}

export default PostPage;
