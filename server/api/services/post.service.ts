import db from "../database/database"
import { Post, User, Like } from "../../@types/schema.d"


export async function getPostById (id: string) {
    try {
      const query = await db<Post>('Post')
        .join('User', 'Post.user_id', '=', 'User.user_id')
        .select('post_id', 'User.user_id', 'Post.created_at', 'post', 'likes', 'username', 'avatar_url' )
        .where('Post.post_id', '=', `${id}`)          
      return query[0]
    }
    catch (err) {
      console.log(err)
      return
    }
  }
  
  export async function getPostCommentsById (id: string) {
    try {
      const query = await db('Comments')
      .join('User', 'User.user_id', '=', 'Comments.user_id')
      .select('Comments.comment_id', 'User.user_id', 'Comments.created_at', 'Comments.comment', 'User.username', 'User.avatar_url' )
      .where('Comments.post_id', '=', `${id}`)
      return query
      
      //db.select().from("Comments").where({ post_id: id })
    }
    catch (err) {
      console.log(err)
      return
    }
  }


export async function deletePostById (id: string) {    
    try {
      const query = await db<Post>("Post").where({ post_id: id }).delete()
      return query[0]
    }
    catch (err) {
      console.log(err)
      return
    }
}

export async function getAllPosts () {
  //TODO need to fix this query
    
    try {
      const query = await db('Post')
      .join('User', 'Post.user_id', '=', 'User.user_id')
      .select('post_id', 'User.user_id', 'Post.created_at', 'post', 'likes', 'username', 'avatar_url' )
      return query
    }
    catch (err) {
      console.log(err)
      return
    }    
}

export async function insertPost (post) {        
    try {
      const res = await db('Post').insert(post)
      const newPost = await db('Post')
      .join('User', 'Post.user_id', '=', 'User.user_id')
      .select('post_id', 'User.user_id', 'Post.created_at', 'post', 'likes', 'username', 'avatar_url' )
      .where('Post.post_id', '=', `${post.post_id}`)      
      return newPost[0] 
    }
    catch (err) {
      console.log(err)
      return
    }
}

export async function insertComment (comment) {  
  try {
    const query = await db<Comment>('Comments').insert(comment)
    return query[0]
  }
  catch (err) {
    console.log(err)
    return
  } 
}

export async function getPostsByUserId (user_id) {    
  try {
    const query = await db<Post, User>('Post')
      .join('User', 'Post.user_id', '=', 'User.user_id')
      .select('post_id', 'User.user_id', 'Post.created_at', 'post', 'likes', 'username', 'avatar_url')
      .where('User.user_id', '=', `${user_id}`) 
    return query         
  }
  catch (err) {
    console.log(err)
    return
  }  
}

export async function insertLike(like: Like) {
  try {
    const query = await db<Like>('Likes').insert(like)
    return query
  }
  catch (err) {
    console.log(err)
    return
  }
}

export async function getAllLikes(post: Post) {
  try {
    const query = await db<Like>('Likes')
      .join('User', 'Likes.user_id', '=', 'User.user_id')
      .select('User.user_id', 'Likes.created_at', 'username', 'avatar_url' )
      .where('Likes.post_id', '=', `${post.post_id}`)
    return query
  }
  catch (err) {
    console.log(err)
    return
  }
}

export async function deleteLike(id, user_id) {
  try {
    const query = await db<Like>("Likes").where({ post_id: id, user_id: user_id }).delete()
    return query
  }
  catch (err) {
    console.log(err)
    return
  }
}