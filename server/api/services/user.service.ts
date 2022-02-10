
import db from '../database/database'
import { User } from "../../@types/schema.d"

export async function getUserByUsername (username: string) {    
    try {
      const query = await db<User>('User').select().where({ username: username })
      return query[0]
    }
    catch (err) {
      console.log(err)
      return 
    }    
  }
  
  export async function searchUserByUsername (username: string) {    
    try {
      const query = await db<User>('User').select('username', 'avatar_url', 'firstName', 'lastName').from("User").where('username', 'like', `%${username}%`)
      return query
    }
    catch (err) {
      console.log(err)
      return
    }
  }

  export async function getFollowingByUsername (username: string) {
    try {
      const query = await db.raw(
        `SELECT user_id, username, firstName, lastName, avatar_url
        FROM (
          SELECT following_id FROM Web_App.Follow, Web_App.User 
          WHERE username = "${username}"
          AND user_id = follower_id
        ) as Followers
        INNER JOIN Web_App.User
        ON User.user_id = Followers.following_id;`
      )
      return query[0]
    }
    catch (err) {
      console.log(err)
      return
    }    
  }

  export async function getFollowersByUsername (username: string) {
    try {
      //ugly but works, may want to refactor this
      const query = await db.raw(
        `SELECT user_id, username, firstName, lastName, avatar_url
        FROM (
          SELECT follower_id FROM Web_App.Follow, Web_App.User 
          WHERE username = "${username}"
          AND user_id = following_id
        ) as Following
        INNER JOIN Web_App.User
        ON User.user_id = Following.follower_id;`
      )
      return query[0]
      //console.log(res[0])
    }
    catch (err) {
      console.log(err)
      return
    }    
  }
  
  export async function addNewFollower (follow) {    
    try {
      const query = await db('Follow').insert(follow)
      return query
    }
    catch (err) {
      console.log(err)
      return
    }
  }

  export async function deleteFollow (user_id: string) {
    try {
      const query = await db('Follow').where({ follower_id: user_id }).delete()
      return query
    }
    catch (err) {
      console.log(err)
      return
    }
  }
  
  export async function insertUser (user) {    
    try {
      const query = await db<User>('User').insert(user)
      return query
    }
    catch (err) {
      console.log(err)
      return
    }    
  }
  
  export async function updateUserQuery (user) {    
    
    try {
      const query = await db<User>('User').where({ user_id: user.user_id }).update(user)
      return query[0]
    }
    catch (err) {
      console.log(err)
      return
    }    
  }