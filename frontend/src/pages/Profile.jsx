import {React, useState, useEffect} from 'react';
import UploadButton from '../components/UploadButton';
import ProfileCard from '../components/ProfileCard'
import UserCard from "../components/User/ProfileCard"
import "../components/styles/Main.css"
import Container from "react-bootstrap/Container"
import Loading from "../components/Loading"
import Post from "../components/Post"
import { Typography } from '@mui/material';
import postApi from '../api/post'
import useFetch from '../hooks/useFetch';
import {getUser} from '../utils'

function Profile() {

  const user = getUser()
  const { response: posts, loading } = useFetch(postApi.getUserPosts, user.username);
  
  return <div className="main-container">
    <Container>
      <ProfileCard/>
      <UploadButton/>
      <div className="mt-4">
        <Typography variant="h4" >
          Your Posts
        </Typography>
        {loading ? (
              <Loading />
            ) : (
              posts.map((post, index) => {
                return <Post key={index} post={post} />;
              })
            )}
      </div>
    </Container>
  </div>;
}

export default Profile;
