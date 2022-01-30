import { React, useState, useEffect, createContext } from "react";
import Post from "../components/Post";
import Container from "react-bootstrap/esm/Container";
import CreatePost from "../components/CreatePost";
import Loading from "../components/Loading";
import "../components/styles/Main.css"
import MainContainer from "../components/MainContainer";
export const FeedContext = createContext(null);

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("auth");

  async function getPosts() {
    setIsLoading(true);
    let payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/post/all`,
      payload
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        alert("Cannot get posts");
      });
    setIsLoading(false);
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <FeedContext.Provider value={{ posts, setPosts }}>
      <div className="main-container">
        <Container>
          <CreatePost />
          {isLoading ? (
            <Loading />
          ) : (
            posts.map((post, index) => {
              return <Post value={{ setPosts }} key={index} post={post} />;
            })
          )}
        </Container>
      </div>
    </FeedContext.Provider>
  );
}
