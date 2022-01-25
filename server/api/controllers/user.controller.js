import AWS from "aws-sdk";
import User from "../models/User.js";

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = "users";

export async function getUser (req, res) {
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

export async function followUser (req, res) {
  const { username } = req.user;
  const follow = req.params.username;

  //TODO need to rewrite this get user function
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
