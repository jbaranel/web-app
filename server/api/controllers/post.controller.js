import { getCurrentTimestamp } from "../helpers/utils.js";
import { v4 as uuidv4 } from "uuid";
import { getPostById, deletePostById, getAllPosts, insertPost } from "../services/post.service.js"
import { getUserByUsername } from "../services/user.service.js"

//create 
export async function createPost(req, res) {
  const { username } = req.user;
  const {user_id} = await getUserByUsername(username)

  const post_body = req.body.post;
  const id = uuidv4();

  const post = {
      post_id :id,
      user_id: user_id,
      post: post_body,
      created_at: getCurrentTimestamp()
    }
  
  const response = await insertPost(post)
  res.status(201).send(response)
}

//get
export async function getPost(req, res) {
  const { id } = req.params 

  const item = await getPostById(id)
  if (item) {
    return res.send(item)
  }
  else {
    return res.status(400).send();
  }        
}

//update
export async function updatePost(req, res) {
  return res.send("Not implemented")
}

//delete
export async function deletePost(req, res) {
  const { username } = req.user;
  const id = req.params.id;

  const post = await getPostById(id)  
    if (!post) {
      return res.status(400).send();
    }
    if (post.username === username) {
      deletePostById(id);
      return res.send({message:"Post deleted"});
    } else {
      return res.status(401).send();
    }    
}

export async function getPosts (req, res) {
  const posts = await getAllPosts()  
  if (posts){
    res.send(posts)    
  }
  else {
    res.status(201).send()
  }
}