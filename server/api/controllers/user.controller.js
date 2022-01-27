import User from "../models/User.js";
import {Database , queryUser} from "../helpers/db.js";
import { generateUploadUrl } from "../helpers/upload.js"

const tableName = "users";

const db = new Database(tableName);

export async function getUser(req, res) {
  let { username } = req.params;

  if (!username) {
    username = req.user.username
  }
  
  const user = await queryUser(username);
  if (username === user?.username) {
    const newUser = new User(
      user.id,
      user.username,
      user.password,
      user.firstName,
      user.lastName,
      user.email,
      user.createdAt,
      user.following,
      user.followers,
      user.avatar
    );
    return res.send(newUser);
  } else {
    return res.status(400).send({ message: "User not found" });
  }
}

export async function followUser(req, res) {
  const { username } = req.user;
  const follow = req.params.username;

  //TODO need to rewrite this get user function
  let user = await db.getUser(username);
  let userToFollow = await db.getUser(follow);

  if (!userToFollow) {
    return res.status(400).send({ message: "User not found" });
  } else if (user.username === userToFollow.username) {
    return res.status(400).send({ message: "Cannot follow yourself" });
  } else if (user?.following?.includes(follow)) {
    return res.status(400).send({ message: `Already following ${follow}` });
  } else {
    if (user.following) {
      user.following = [...user.following, userToFollow.username];
    } else {
      user.following = [userToFollow.username];
    }
    const followingParams = {
      TableName: tableName,
      Key: {
        username: user.username,
      },
      UpdateExpression: "set following = :f",
      ExpressionAttributeValues: {
        ":f": user.following,
      },
    };

    db.updateUser(followingParams)

    res.send(user)    
  }
}

export async function updateUser(req, res) {
  const { firstName, lastName, avatar } = req.body;
  const {username} = req.user
  const user = await db.getUser(username)

  if (avatar) {
    user.avatar = avatar
  }
  if (firstName) {
    user.firstName = firstName
  }
  if (lastName) {
    user.lastName = lastName
  }
  const params = {
    TableName: tableName,
    Key: {
      username: user.username,
    },
    UpdateExpression: "set firstName = :f, lastName = :l, avatar = :a",
    ExpressionAttributeValues: {
      ":f": user.firstName,
      ":l": user.lastName,
      ":a": user.avatar,
    },
  };

  db.updateUser(params)

  res.send(user)
}

export async function generateUrl(req, res) {
  const uploadUrl = await generateUploadUrl()  

  if (uploadUrl) {
    return res.send({url:uploadUrl})
  }
  else {
    return res.status(500).send()
  }
}