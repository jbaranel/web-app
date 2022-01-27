import { getUserByUsername, getFollowersByUsername, addNewFollower, updateUserQuery} from "../services/user.service.js";
import { generateUploadUrl } from "../helpers/upload.js"
import { getCurrentTimestamp } from "../helpers/utils.js";

export async function getUser(req, res) {
  let { username } = req.params;

  if (!username) {
    username = req.user.username
  }
  
  const user = await getUserByUsername(username);

  if (username === user?.username) {
    const returnUser = (user) => {
      delete user.password
      return user
    }
    return res.send(returnUser(user));
  } else {
    return res.status(400).send({ message: "User not found" });
  }
}

export async function followUser(req, res) {
  const { username } = req.user;
  const follow = req.params.username;

  let user = await getUserByUsername(username);
  let userToFollow = await getUserByUsername(follow);
  
  if (!userToFollow) {
    return res.status(404).send({ message: "User not found" });
  } else if (user.username === userToFollow.username) {
    return res.status(400).send({ message: "Cannot follow yourself" });
  } else {

    const follow = {
      follower_id: user.user_id, 
      following_id: userToFollow.user_id,
      created_at: getCurrentTimestamp()
    }
    
    const response = await addNewFollower(follow)
    if (response[0] === 0) {
      res.send({message:"Success"})    
    }
    else {
      res.status(400).send({message: "Error"})
    }
  }
}

export async function getFollowers(req, res) {
  const {username} = req.params
  const followers = await getFollowersByUsername(username)
  res.send(followers)
}

export async function updateUser(req, res) {
  const { firstName, lastName, avatar_url } = req.body;
  const {username} = req.user

  const user = await getUserByUsername(username);

  const update = (user) => {
    if (firstName) {
      user.firstName = firstName
    }
    if (lastName) {
      user.lastName = lastName
    }
    if (avatar_url) {
      user.avatar_url = avatar_url
    }
    return user
  }
  const response = await updateUserQuery(update(user))
  
  res.send(response)
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