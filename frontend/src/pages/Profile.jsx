import {React, useState, useEffect} from 'react';
import UploadButton from '../components/UploadButton';
import ProfileCard from '../components/ProfileCard'
import "../components/styles/Main.css"
import Container from "react-bootstrap/Container"
import Loading from "../components/Loading"
import Post from "../components/Post"
import { Typography } from '@mui/material';
function Profile() {
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
      `${process.env.REACT_APP_API_URL}/post/userPosts`,
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


  return <div className="main-container">
    <Container>
      <ProfileCard/>
      <UploadButton/>
      <div className="mt-4">
        <Typography variant="h4" >
          Your Posts
        </Typography>
        {isLoading ? (
              <Loading />
            ) : (
              posts.map((post, index) => {
                return <Post value={{ setPosts }} key={index} post={post} />;
              })
            )}
      </div>
    </Container>
  </div>;
}

export default Profile;
