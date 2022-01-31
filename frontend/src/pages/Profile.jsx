import {React, useState, useEffect} from 'react';
import UploadButton from '../components/UploadButton';
import ProfileCard from '../components/ProfileCard'
import UserCard from "../components/User/ProfileCard"
import "../components/styles/Main.css"
import Container from "react-bootstrap/Container"
import Loading from "../components/Loading"
import Post from "../components/Post"
import { Typography } from '@mui/material';
import API from "../apiHelper.js"

function Profile() {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getPosts() {
    setIsLoading(true);
    const response = await API.GET(`post/userPosts`)
    if (response) {
      setPosts(response)
      setIsLoading(false);
    }
  }

  const getUser = async () => {
    setIsLoading(true);
    const response = await API.GET(`user`)
    if (response) {
      setPosts(response)
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);


  return <div className="main-container">
    <Container>
      <ProfileCard user={user}/>
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
