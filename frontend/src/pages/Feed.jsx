import { React, useState, useEffect } from "react";
import Post from "../components/Post";
import Container from "react-bootstrap/esm/Container";
import CreatePost from "../components/CreatePost";
import Loading from "../components/Loading"

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  async function getPosts() {
    setIsLoading(true)
    let payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "username",
      }),
    };
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts`,
      payload
    )
    .then((res) => res.json())
    .then((data) => {
      setPosts(data)       
  }).catch((error) => {
    alert("Cannot get posts")
  }) 
  setIsLoading(false) 
} 
  useEffect(() => {
    const fetchPosts = getPosts()  
  }, [])

  return (
    <div>
      <Container>
        <CreatePost setPosts={setPosts} />        
        {isLoading ?
        <Loading/>
        : posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </Container>
    </div>
  );
}
