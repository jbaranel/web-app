import AWS from "aws-sdk";
import { User } from './schema.js'
import { validateEmail, stringToDate } from './utils.js'

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
                return new User(user.username, user.firstName, user.lastName, user.email, stringToDate(user.createdAt));
            }
            else {
                return ("User not found")
            }
        })
        return result
    } catch (error) {
        console.error(error);
    }
}

async function createUser(user){
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
                return ("Username already exists");
            }
            else {
                if (!user.firstName){
                    return ("Missing first name");
                }
                else if(!user.lastName){
                    return ("Missing last name");
                }
                else if(!user.email){
                    return ("Missing email");
                }
                else if(!validateEmail(user.email)){
                    return ("Enter a valid email address")
                }
                else {
                    let newUser = new User(user.username, user.firstName, user.lastName, user.email, Date.now().toString())
                  
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

export { createUser, getUser }