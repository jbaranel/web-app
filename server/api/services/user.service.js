
import { connection } from "../helpers/db_connector.js"

export async function getUserByUsername (username) {
    const database = await connection()
    let res;
    try {
      res = await database.select().from("User").where({ username: username })
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res[0]
  }
  
  export async function searchUserByUsername (username) {
    const database = await connection()
    let res;
    try {
      res = await database.select('username', 'avatar_url', 'firstName', 'lastName').from("User").where('username', 'like', `%${username}%`)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res
  }

  export async function getFollowersByUsername (username) {
    const database = await connection()
    let res;
    try {
      //ugly but works, may want to refactor this
      res = await database.raw(
        `SELECT user_id, username, firstName, lastName, avatarUrl
        FROM (
          SELECT following_id FROM Web_App.Follow, Web_App.User 
          WHERE username = "${username}"
          AND user_id = follower_id
        ) as Followers
        INNER JOIN Web_App.User
        ON User.user_id = Followers.following_id;`
      )
      //console.log(res[0])
    }
    catch (err) {
      console.log(err)
      res = []
    }
    finally {
      database.destroy()
    }
    return res[0]
  }
  
  export async function addNewFollower (follow) {
    const database = await connection()
    let res;
    
    try {
      res = await database('Follow').insert(follow)
    }
    catch (err) {
      console.log(err)
      res = err
    }
    finally {
      database.destroy()
    }
    return res
  }
  
  export async function insertUser (user) {
    const database = await connection()
    let res;
    try {
      res = await database('User').insert(user)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res
  }
  
  export async function updateUserQuery (user) {
    console.log(user)
    const database = await connection()
    let res;
    try {
      res = await database('User').where({ user_id: user.user_id }).update(user)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      database.destroy()
    }
    return res[0]
  }