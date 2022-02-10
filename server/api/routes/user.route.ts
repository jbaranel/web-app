import express from "express";
import {
  getUser,
  followUser,
  updateUser,
  generateUrl,
  getFollowers,
  searchUsername,
  getFollowing,
  getUserLikes,
  unfollowUser
} from "../controllers/user.controller";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/avatarUpload", auth, generateUrl);

router.get("/:username", auth, getUser);

router.get("/", auth, getUser);

router.patch("/", auth, updateUser);

router.post("/:username/follow", auth, followUser);

router.delete("/:username/follow", auth, unfollowUser);

router.get("/:username/followers", auth, getFollowers);

router.get("/:username/following", auth, getFollowing);

router.get("/:username/liked_posts", auth, getUserLikes);

router.get("/search/:username", auth, searchUsername);

export default router;
