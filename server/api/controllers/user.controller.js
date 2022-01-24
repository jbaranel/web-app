import AWS from "aws-sdk";
import User from "../models/User.js";
import { validateEmail, stringToDate } from "../utils.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = "users";

export const getUser = async (req, res) => {
  const { username } = req.params;

  let params = {
    Key: {
      username: username,
    },
    TableName: tableName,
  };

  await dynamodb
    .get(params)
    .promise()
    .then((response) => {
      const user = response?.Item;
      if (username == user?.username) {
        //TODO add functions to this class to return different data for api calls ie) User.get, etc.
        const newUser = new User(
          user.username,
          user.password,
          user.firstName,
          user.lastName,
          user.email,
          user.createdAt,
          user.following,
          user.followers
        );
        return res.send(newUser);
      } else {
        return res.status(400).send({ message: "User not found" });
      }
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).send({ message: "An error has occured" });
    });
};

export const createUser = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;

  if (!username) {
    return res.status(400).send({ message: "Missing username" });
  }
  if (!password) {
    return res.status(400).send({ message: "Missing password" });
  }

  const salt = 10;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      password = hash;
    }
  });

  let params = {
    Key: {
      username: username,
    },
    TableName: tableName,
  };

  await dynamodb
    .get(params)
    .promise()
    .then((response) => {
      const checkUsername = response.Item?.username;
      if (checkUsername == username) {
        return res.status(400).send({message: "Username already exists"})
      } else {
        if (!firstName) {
            return res.status(400).send({message: "Missing first name" });
        } else if (!lastName) {
            return res.status(400).send({ message: "Missing last name" });
        } else if (!email) {
            return res.status(400).send({ message: "Missing email" });
        } else if (!validateEmail(email)) {
            return res.status(400).send({message: "Enter a valid email address" });
        } else {
          let newUser = new User(
            username,
            password,
            firstName,
            lastName,
            email,
            Date.now()
          );

          let params = {
            TableName: tableName,
            Item: newUser,
          };

          dynamodb.put(params, (err, res) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "An error has occured" });
            } else {
              return res.send(newUser)
            }
          });
        }
      }
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).send({ message: "An error has occured" });
    });
};

export const followUser = async (req, res) => {
  const { username } = req.params;
  const follow = req.body.username;

  let user = await getUser(username);
  let userToFollow = await getUser(follow);

  if (userToFollow.message) {
    return userToFollow;
  } else if (user.username === userToFollow.username) {
    return { message: "Cannot follow yourself" };
  } else if (user?.following?.includes(follow)) {
    return { message: `Already following ${follow}` };
  } else {
    if (user.following) {
      user.following = [...user.following, userToFollow.username];
    } else {
      user.following = [userToFollow.username];
    }
    const followingParams = {
      TableName: "users",
      Key: {
        username: user.username,
      },
      UpdateExpression: "set following = :f",
      ExpressionAttributeValues: {
        ":f": user.following,
      },
    };

    dynamodb.update(followingParams, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });

    if (userToFollow.followers) {
      userToFollow.followers = [...userToFollow.followers, user.username];
    } else {
      userToFollow.followers = [user.username];
    }
    console.log(userToFollow);
    const followerParams = {
      TableName: "users",
      Key: {
        username: userToFollow.username,
      },
      UpdateExpression: "set followers = :f",
      ExpressionAttributeValues: {
        ":f": userToFollow.followers,
      },
    };

    dynamodb.update(followerParams, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  }
  return user;
};
