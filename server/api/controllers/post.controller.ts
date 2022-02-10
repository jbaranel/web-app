import { getCurrentTimestamp, sortDates } from "../helpers/utils";
import { v4 as uuidv4 } from "uuid";
import { getPostById, deletePostById, getAllPosts, insertPost, getPostCommentsById, insertComment, getPostsByUserId, insertLike, deleteLike, getAllLikes } from "../services/post.service"
import { getUserByUsername } from "../services/user.service"
import { Request, Response } from "express"

//create 
export async function createPost(req: any, res: Response) {
  const { username } = req.user;
  const user = await getUserByUsername(username)

  if (!user) {
    return res.status(500).send()
  }

  const user_id = user.user_id

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

  let post = await getPostById(id)

  if (post) {
    const unsortedComments = await getPostCommentsById(id)
    const likes = await getAllLikes(post)
    
    const comments = sortDates(unsortedComments)

    const postHydrate = {...post, likes, comments}

    return res.send(postHydrate)
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
    const postsLikes = await Promise.all(posts.map(async (post) => {
      const likes = await getAllLikes(post)
      return {...post, likes}
    }))

    const postsComments = await Promise.all(postsLikes.map(async (post) => {
      const comments = await getPostCommentsById(post.post_id)
      return {...post, comments}
    }))  
    
    const sortedPosts = sortDates(postsComments)
    res.send(sortedPosts)    
  }
  else {
    res.status(201).send()
  }
}

export async function commentOnPost (req, res) {
  const {comment} = req.body
  const { id } = req.params
  const { username } = req.user;

  const user = await getUserByUsername(username)
  if (!user) {
    return res.status(400).send()
  }

  const user_id = user.user_id;

  let newComment = {
    comment_id: uuidv4(),
    post_id: id,
    user_id: user_id,
    created_at: getCurrentTimestamp(),
    comment: comment,
  }  
  
  const response = await insertComment(newComment)
  let c = { ...newComment,
    username: username,
    avatar_url: user.avatar_url
  }    
  return  res.send(c)  
}

export async function getUserPosts (req, res) {
  const { username } = req.params  
  const user = await getUserByUsername(username)
  if (!user) {
    return res.status(400).send()
  }
  const user_id = user.user_id
  const posts = await getPostsByUserId(user_id)
  if (posts){
    const postsLikes = await Promise.all(posts.map(async (post) => {
      const likes = await getAllLikes(post)
      return {...post, likes}
    }))

    const postsComments = await Promise.all(postsLikes.map(async (post) => {
      const comments = await getPostCommentsById(post.post_id)
      return {...post, comments}
    }))  
    const sortedPosts = sortDates(postsComments)
    return res.send(sortedPosts)
  }
  else {
    return res.status(400).send()
  }
}

//liking posts
export async function likePost (req, res) {
  const { username } = req.user;
  const user = await getUserByUsername(username)

  if (!user) {
    return res.status(500).send()
  }

  const { id } = req.params 

  let newLike = {
    post_id: id,
    user_id: user.user_id,
    created_at: getCurrentTimestamp()
  }

  const like = await insertLike(newLike)
  if (like) {
    return res.status(201).send()
  }
  return res.status(400).send()
}

export async function unlikePost(req,res) {
  const { username } = req.user;
  const user = await getUserByUsername(username)

  if (!user) {
    return res.status(500).send()
  }

  const { id } = req.params 

  const remove = await deleteLike(id, user.user_id)

  if (remove) {
    return res.status(201).send()
  }
  return res.status(400).send()
}

export async function getPostLikes(){
  
}