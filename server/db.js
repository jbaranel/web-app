import AWS from "aws-sdk";
import { User, Post } from './schema.js'
import { validateEmail, stringToDate } from './utils.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

AWS.config.update({region: "us-east-1"});

const dynamodb = new AWS.DynamoDB.DocumentClient()

const tableName = "users"

async function getUser(username){
    try {
        let params = {
            Key: {
             "username": username
            }, 
            TableName: tableName
        };
        let result = await dynamodb.get(params).promise()
        .then((response) => {
            const user = response?.Item
            if (username == user?.username){
                return (
                    new User(user.username, user.password, user.firstName, user.lastName, user.email, user.createdAt)
                   );
            }
            else {
                return ({"message":"User not found"})
            }
        })
        return result
    } catch (error) {
        console.error(error);
    }
}

async function createUser(user){
    if(!user.username){
        return ({"message":"Enter a username"});
    }
    if(!user.password){
        return ({"message":"Enter a password"});
    }
    const salt = 10;
    bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
            console.log(err)
        }
        else {
            delete user.password;
            user.hashedPassword = hash;
        }
    })
    try {
        let params = {
            Key: {
             "username": user.username
            }, 
            TableName: tableName
        };
        let result = await dynamodb.get(params).promise()
        .then((response) => {
            const username = response.Item?.username;
            if (username == user.username){
                return ({"message":"Username already exists"});
            }
            else {
                if (!user.firstName){
                    return ({"message":"Missing first name"});
                }
                else if(!user.lastName){
                    return ({"message":"Missing last name"});
                }
                else if(!user.email){
                    return ({"message":"Missing email"});
                }
                else if(!validateEmail(user.email)){
                    return ({"message":"Enter a valid email address"})
                }
                else {
                    let newUser = new User(user.username, user.hashedPassword, user.firstName, user.lastName, user.email, Date.now())
                  
                    let params = {
                        TableName: tableName,
                        Item: newUser
                    }
                    
                    dynamodb.put(params, ((err, res)=> {
                        if (err) {
                            return err;
                        }
                        else {
                            return (newUser)
                        }
                    }))

                    return newUser;
                }
            }            
        })
        return result
    } catch (error) {
        console.error(error);
    }
}

async function createPost(username, post) {
    const id = uuidv4()
    const newPost = new Post(id, username, Date.now(), post)
    let params = {
        TableName: "posts",
        Item: newPost
    }
    
    let result = dynamodb.put(params, ((err, res)=> {
        if (err) {
            console.log(err)
            return err;
        }
        else {
            return (newPost)
        }
    }))
    return newPost
    
}

async function getPosts(username) {
    try {
        let params = {             
            TableName: "posts"
        };
        let result = await dynamodb.scan(params).promise()
        .then((response) => {
            let posts = response.Items
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
            return posts
        })
        return result
    } catch (error) {
        console.error(error);
    }
    
}

export { createUser, getUser, createPost, getPosts}