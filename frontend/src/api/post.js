import client from "./api_client";

const token = localStorage.getItem("auth");

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const getUserPosts = (username) => client.get(`post/all/${username}`, config);

const getAllPosts = () => client.get('post/all', config);

const createNewPost = (body) => client.post('post/create', config, body)

export default {
    getUserPosts,
   getAllPosts,
   createNewPost
};