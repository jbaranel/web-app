import AWS from "aws-sdk";
import Post from "../models/Post.js";
import { validateEmail, stringToDate } from "../helpers/utils.js";
import { v4 as uuidv4 } from "uuid";

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = "posts";

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

  dynamodb.put(params, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    } else {
      res.send(newPost);
    }
  });
}

//get
export async function getPost(req, res) {
  const { id } = req.params 

  const item = await getItem(id)
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

  const post = await getItem(id)  
      if (!post) {
        return res.status(400).send();
      }
      if (post.username === username) {
        removeFromDB(id);
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
    console.log(posts)
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

function removeFromDB(id) {
  let params = {
    TableName: tableName,
    Key: {
      id: id,
    },
  };
  dynamodb.delete(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
    }
  });
}

async function getItem(id) {
  
  let params = {
    Key: {
      id: id,
    },
    TableName: tableName,
  };

  const result = await dynamodb
    .get(params)
    .promise()
    .then((response) => {
      const item = response?.Item;
      if (item) {
        return item;
      }
      else {
        return {}
      }
    })
  return result
}