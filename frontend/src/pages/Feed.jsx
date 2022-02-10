import { React, useState, useEffect, createContext } from "react";
import Post from "../components/Post";
import Container from "react-bootstrap/esm/Container";
import CreatePost from "../components/CreatePost";
import Loading from "../components/Loading";
import "../components/styles/Main.css"
import useFetch from "../hooks/useFetch";
import postApi from '../api/post'

export const FeedContext = createContext(null);
export default function Feed() {
  
  const {response: posts, loading, setResponse: setPosts} = useFetch(postApi.getAllPosts)  

  return (
    <FeedContext.Provider value={{ posts, setPosts }}>
      <div className="main-container">
        <Container>
          <CreatePost />
          {loading ? (
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
