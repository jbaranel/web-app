import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { stringToDate } from '../utils.js'

function CreatePost(props) {
  const [post, setPost] = useState("");  

  function handleSubmit(event) {
    const user = JSON.parse(localStorage.getItem("user"))
    event.preventDefault();
    if (!post) {
      alert("Post cannot be empty!");
    } else {
      try {
        let payload = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            post: post,
          }),
        };
        let response = fetch(
          `${process.env.REACT_APP_API_URL}/createPost`,
          payload
        ).
        then((res) => res.json()).then((data) => {
          if (data.message) {
              console.log(data.message)
          } else {                 
              data.createdAt = stringToDate(data.createdAt)
              props.setPosts(arr => [data, ...arr]) 
              setPost("");
          }
        });
      } catch (error) {
      }
    }
  }

  return (
    <div class="mb-3 mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <h3>Enter Post</h3>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setPost(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Create Post</Button>
      </Form>
    </div>
  );
}

export default CreatePost;
