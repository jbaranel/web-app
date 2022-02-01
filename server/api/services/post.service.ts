import { connection } from "../helpers/db_connector"
import { Post } from "../../@types/post.d"
import { User } from "../../@types/user.d"

export async function getPostById (id: string) {
    const database = await connection()
    let res;
    try {
      res = await database('Post')
        .join('User', 'Post.user_id', '=', 'User.user_id')
        .select('post_id', 'User.user_id', 'Post.created_at', 'post', 'likes', 'username', 'avatar_url' )
        .where('Post.post_id', '=', `${id}`)          
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res[0]
  }
  
  export async function getPostCommentsById (id: string) {
    const database = await connection()
    let res;
    try {
      res = await database('Comments')
      .join('User', 'User.user_id', '=', 'Comments.user_id')
      .select('Comments.comment_id', 'User.user_id', 'Comments.created_at', 'Comments.comment', 'User.username', 'User.avatar_url' )
      .where('Comments.post_id', '=', `${id}`)    
      
      database.select().from("Comments").where({ post_id: id })
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res
  }


export async function deletePostById (id:string ) {
    const database = await connection()
    let res;
    try {
      res = await database("Post").where({ post_id: id }).delete()
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res[0]
}

export async function getAllPosts () {
  //TODO need to fix this query
    const database = await connection()
    let res;
    try {
      res = await database('Post')
      .join('User', 'Post.user_id', '=', 'User.user_id')
      .select('post_id', 'User.user_id', 'Post.created_at', 'post', 'likes', 'username', 'avatar_url' )
      
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res
}

export async function insertPost (post) {

    const database = await connection()
    let res;
    try {
      res = await database('Post').insert(post)
      res = await database('Post')
      .join('User', 'Post.user_id', '=', 'User.user_id')
      .select('post_id', 'User.user_id', 'Post.created_at', 'post', 'likes', 'username', 'avatar_url' )
      .where('Post.post_id', '=', `${post.post_id}`)       
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res[0]   
}

export async function insertComment (comment) {
  const database = await connection()
  let res;
  try {
    res = await database('Comments').insert(comment)
  }
  catch (err) {
    console.log(err)
  }
  finally {
    database.destroy()
  }
  return res[0]
}

export async function getPostsByUserId (user_id) {  
  const database = await connection()
  let res;
  try {
    res = await database('Post')
      .join('User', 'Post.user_id', '=', 'User.user_id')
      .select('post_id', 'User.user_id', 'Post.created_at', 'post', 'likes', 'username', 'avatar_url' )
      .where('User.user_id', '=', `${user_id}`)          
  }
  catch (err) {
    console.log(err)
  }
  finally {
    database.destroy()
  }
  return res
}