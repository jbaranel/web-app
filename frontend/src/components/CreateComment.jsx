import {React, useState} from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function CreateComment({ post }) {

  const [reply, setReply] = useState("")

  function handleSubmit(event) {
    event.preventDefault();
    if (!reply) {
      alert("Reply cannot be empty!");
    } else {
      try {
        const token = localStorage.getItem("auth")
        let payload = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            comment: reply,
          }),
        };
        let response = fetch(
          `${process.env.REACT_APP_API_URL}/post/${post.post_id}/reply`,
          payload
        ).
        then((res) => res.json()).then((data) => {
          if (data.message) {
              console.log(data.message)
          } else {                 
              //setPosts(arr => [data, ...arr]) 
              //setPost("");
          }
        });
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  return <div className="mt-3 mb-2">  
   <Form onSubmit={handleSubmit}>
     <Form.Group>       
       <Form.Control type="text" placeholder="Reply to post" onChange={(e) => setReply(e.target.value)}/>
       {reply ? <Button className='mt-2' type="submit">Reply</Button>
        : 
        <Button className='mt-2' type="submit" disabled>Reply</Button>}
     </Form.Group>
   </Form>
  </div>;
}

export default CreateComment;
