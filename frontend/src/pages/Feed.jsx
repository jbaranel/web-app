import { React, useState, useEffect } from "react";
import Post from "../components/Post";
import Container from "react-bootstrap/esm/Container";
import CreatePost from "../components/CreatePost";
import Loading from "../components/Loading"

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  
  const token = localStorage.getItem("auth")

  async function getPosts() {
    setIsLoading(true)
    let payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },     
    };
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/post/all`,
      payload
    )
    .then((res) => res.json())
    .then((data) => {
      setPosts(data.posts)       
  }).catch((error) => {
    alert("Cannot get posts")
  }) 
  setIsLoading(false) 
} 
  useEffect(() => {
    getPosts()  
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
