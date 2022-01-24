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
                    new User(user.username, user.password, user.firstName, user.lastName, user.email, user.createdAt, user.following, user.followers)
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

async function deletePost(username, id) {
    //TODO validate that user is authorized to delete this post
    try {
        let params = {             
            TableName: "posts",
            Key: {
                "id": id
                }
            }
            dynamodb.delete(params, function(err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                }
            })
            return ({message: "Post deleted"})
        }
    catch (error) {
        console.log(error)
    }
}

async function followUser(username, follow) {
    let user = await getUser(username)
    let userToFollow = await getUser(follow)

    if (userToFollow.message) {
        return userToFollow
    }
    else if (user.username === userToFollow.username) {
        return ({message:"Cannot follow yourself"})
    }
    else if (user?.following?.includes(follow)) {
        return ({message:`Already following ${follow}`})
    }
    else {
        if (user.following) {
            user.following = [...user.following, userToFollow.username]
        }
        else {
            user.following = [userToFollow.username]
        }
        const followingParams = {
            TableName: 'users',
            Key: {
              "username": user.username,
            },
            UpdateExpression: 'set following = :f',
            ExpressionAttributeValues: {
              ':f': user.following,
            },
          }
    
        dynamodb.update(followingParams, function(err, data) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(data)
            }
        })

        if (userToFollow.followers) {
            userToFollow.followers = [...userToFollow.followers, user.username]
        }
        else {
            userToFollow.followers = [user.username]
        }
        console.log(userToFollow)
        const followerParams = {
            TableName: 'users',
            Key: {
                "username": userToFollow.username,
            },
            UpdateExpression: 'set followers = :f',
            ExpressionAttributeValues: {
                ':f': userToFollow.followers,
            }
        }

        dynamodb.update(followerParams, function(err, data) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(data)
            }
        })
    }
    return (user)
}

export { createUser, getUser, createPost, getPosts, deletePost, followUser}