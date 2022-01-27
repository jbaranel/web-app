import { connection } from "../helpers/db_connector.js"

export async function getPostById (id) {
    const database = await connection()
    let res;
    try {
      res = await database.select().from("Post").where({ post_id: id })
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res[0]
  }

export async function deletePostById (id) {
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
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return post
}