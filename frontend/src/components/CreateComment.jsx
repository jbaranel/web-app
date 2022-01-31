import { React, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PostContext } from "../pages/PostPage";
import API from "../apiHelper";

function CreateComment() {
  const { post, setPost } = useContext(PostContext);
  const { comments, setComments } = useContext(PostContext);
  const [reply, setReply] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!reply) {
      alert("Reply cannot be empty!");
      return;
    }
    const body = JSON.stringify({comment: reply})

    const response = await API.POST(
      `post/${post.post_id}/reply`,
      body
    );
    if (response) {
      setComments(comments => [response, ...comments])
    }
  }

  return (
    <div className="mt-3 mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Reply to post"
            onChange={(e) => setReply(e.target.value)}
          />
          {reply ? (
            <Button className="mt-2" type="submit">
              Reply
            </Button>
          ) : (
            <Button className="mt-2" type="submit" disabled>
              Reply
            </Button>
          )}
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateComment;
