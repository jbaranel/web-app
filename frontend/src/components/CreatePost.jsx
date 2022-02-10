import { React, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { stringToDate } from '../utils.js'
import {FeedContext} from "../pages/Feed"
import API from "../apiHelper"
import useFetch from "../hooks/useFetch";
import postApi from '../api/post'

function CreatePost() {
  const [post, setPost] = useState("");  
  const { posts, setPosts } = useContext(FeedContext)  
  const fetch = useFetch()

  async function handleSubmit(event) {
    event.preventDefault();    
    if (!post) {
      alert("Post cannot be empty!");
      return
    } 
    const body = JSON.stringify({
      post: post
    })
    const response = await API.POST('post/create', body)
//    const { response } = fetch(postApi.createNewPost, body)
    if (response) {
      setPosts(arr => [response, ...arr]) 
      setPost("");
    }
  }

  return (
    <div className="mb-3 mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <h3>What's on your mind?</h3>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setPost(e.target.value)}
          />
        </Form.Group>
        {post ? <Button type="submit">Create Post</Button>
        : 
        <Button type="submit" disabled>Create Post</Button>}
      </Form>
    </div>
  );
}

export default CreatePost;
