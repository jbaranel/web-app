import {
  getUserByUsername,
  getFollowersByUsername,
  addNewFollower,
  updateUserQuery,
  searchUserByUsername,
  getFollowingByUsername,
  deleteFollow,
} from "../services/user.service";
import { generateUploadUrl } from "../helpers/upload";
import { getCurrentTimestamp } from "../helpers/utils";

export async function getUser(req, res) {
  let username = req.params.username;

  if (!username) {
    username = req.user.username;
  }
  let user = await getUserByUsername(username);
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
  const following = await getFollowingByUsername(username);
  const followers = await getFollowersByUsername(username);

  user.followers = followers;
  user.following = following;
  if (username === user?.username) {
    const returnUser = (user) => {
      delete user.password;
      return user;
    };
    return res.send(returnUser(user));
  } else {
    return res.status(400).send({ message: "User not found" });
  }
}

export async function followUser(req, res) {
  const { username } = req.user;
  const follow = req.params.username;

  let user = await getUserByUsername(username);
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
  let userToFollow = await getUserByUsername(follow);

  if (!userToFollow) {
    return res.status(404).send({ message: "User not found" });
  } else if (user.username === userToFollow.username) {
    return res.status(400).send({ message: "Cannot follow yourself" });
  } else {
    const follow = {
      follower_id: user.user_id,
      following_id: userToFollow.user_id,
      created_at: getCurrentTimestamp(),
    };

    const response = await addNewFollower(follow);
    if (response) {
      res.send({ message: "Success" });
    } else {
      res.status(400).send({ message: "Error" });
    }
  }
}

export async function unfollowUser(req, res) {
  const { username } = req.user;
  const user = await getUserByUsername(username);
  if (user) {
    const query = await deleteFollow(user.user_id);
    if (query) {
      return res.status(201).send();
    } else {
      return res.status(400).send();
    }
  }
}

export async function getFollowers(req, res) {
  const { username } = req.params;
  const followers = await getFollowersByUsername(username);
  res.send(followers);
}

export async function getFollowing(req, res) {
  const { username } = req.params;
  const following = await getFollowingByUsername(username);
  res.send(following);
}

export async function updateUser(req, res) {
  const { firstName, lastName, avatar_url } = req.body;
  const { username } = req.user;

  const user = await getUserByUsername(username);

  const update = (user) => {
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (avatar_url) {
      user.avatar_url = avatar_url;
    }
    return user;
  };
  const response = await updateUserQuery(update(user));
  if (response) {
    return res.send(response);
  }
  return res.status(500).send();
}

export async function generateUrl(req, res) {
  const uploadUrl = await generateUploadUrl();

  if (uploadUrl) {
    return res.send({ url: uploadUrl });
  } else {
    return res.status(500).send();
  }
}

//TODO will need to change this implementaion at some point, just a poc for now.
export async function searchUsername(req, res) {
  const { username } = req.params;
  const users = await searchUserByUsername(username);
  res.send(users);
}

export async function getUserLikes() {}
