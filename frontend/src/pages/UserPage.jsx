import { React, useState, useEffect } from "react";
import ProfileCard from "../components/User/ProfileCard";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading"
import "../components/styles/Main.css"
import API from "../apiHelper"
import UserCard from "../components/UserCard"
import useFetch from "../hooks/useFetch";
import userApi from '../api/user'
import postApi from '../api/post'
import Post from '../components/Post'

function UserPage() {
  const location = useLocation();

  const user_id = location.pathname.split("user/")[1];
 
  const { response: user } = useFetch(userApi.getUser, user_id);
  const { response: posts, loading } = useFetch(postApi.getUserPosts, user_id);

  return <div>
    <div className="main-container">
      {loading ? <Loading /> : 
      <>
      <ProfileCard user={user} />
      <h3>Posts</h3>
      {posts.length ? (
        posts.map((post, index) => {
          return <Post key={index} post={post}/>
        })) : (
          <div>No posts</div>
      )}
      </>
      }
    </div>
  </div>;
}

export default UserPage;
