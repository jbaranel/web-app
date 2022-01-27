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
    const database = await connection()
    let res;
    try {
      res = await database("Post").select()
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res[0]
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
    return res
}