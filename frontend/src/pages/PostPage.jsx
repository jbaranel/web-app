import { React, useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import SinglePost from "../components/SinglePost";
import "../components/styles/Main.css";
import Container from "react-bootstrap/Container";
import Comments from "../components/Comments";
import CreateComment from "../components/CreateComment";
import Loading from "../components/Loading";
import API from "../apiHelper.js"

export const PostContext = createContext(null);

function PostPage() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("auth");
  const location = useLocation();
  const post_id = location.pathname.split("post/")[1];
  const [comments, setComments] = useState([]);

  async function getPost() {
    setIsLoading(true);
    const response = await API.GET(`post/${post_id}`)
    if (response) {
      setPost(response)
      setComments(response.comments)
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getPost();
  }, []);

  return (
    <PostContext.Provider value={{ post, setPost, comments, setComments }}>
      <div className="main-container">
        <Container>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <SinglePost post={post} />

              <CreateComment/>
              <>
                {comments.length ? (
                  comments.map((comment) => (
                    <Comments key={comment.comment_id} comment={comment} />
                  ))
                ) : (
                  <div>No comments</div>
                )}
              </>
            </>
          )}
        </Container>
      </div>
    </PostContext.Provider>
  );
}

export default PostPage;
