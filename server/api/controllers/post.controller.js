import Post from "../models/Post.js";
import { stringToDate } from "../helpers/utils.js";
import { v4 as uuidv4 } from "uuid";
import {Database , user} from "../helpers/db.js";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });


const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = "posts";

const db = new Database(tableName)

//create 
export async function createPost(req, res) {
  const { username } = req.user;
  const post = req.body.post;
  const id = uuidv4();

  const newPost = new Post(id, username, Date.now(), post);
  let params = {
    TableName: tableName,
    Item: newPost,
  };

  db.putItem(params)
  res.send(newPost)
}

//get
export async function getPost(req, res) {
  const { id } = req.params 

  const item = await db.getItem(id)
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

  const post = await db.getItem(id)  
      if (!post) {
        return res.status(400).send();
      }
      if (post.username === username) {
        db.removeFromDB(id);
        return res.send({message:"Post deleted"});
      } else {
        return res.status(401).send();
      }    
}


export async function getAllPosts (req, res) {
  let params = {             
    TableName: tableName
  };
  
  
  await dynamodb.scan(params).promise()
  .then((response) => {
    let posts = response?.Items
    if (posts) {
      posts.sort(function(a, b) {
        var keyA = a.createdAt,
        keyB = b.createdAt;
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });
      
      posts.forEach((post) => {
        post.createdAt = stringToDate(post.createdAt)
      })
      res.send({posts})    
    }
    else {
      res.status(500).send()
    }
  })  
}