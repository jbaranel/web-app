import client from "./api_client";

const token = localStorage.getItem("auth");

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const getUser = (username) => client.get(`/user/${username}`, config);

const getUserFollowing = (username) => client.get(`/user/${username}/following`, config)

const searchUsers = (username) => client.get(`user/search/${username}`, config)

export default {
  getUser,
  getUserFollowing,
  searchUsers
};