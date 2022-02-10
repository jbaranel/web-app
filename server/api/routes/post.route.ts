import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPosts,
  commentOnPost,
  getUserPosts,
  likePost,
  unlikePost,
  getPostLikes
} from "../controllers/post.controller";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/create", auth, createPost);

router.get("/all", auth, getPosts);

router.get("/all/:username", auth, getUserPosts);

router.get("/:id", auth, getPost);

router.post("/:id/reply", auth, commentOnPost);
// TODO not implemented
router.delete("/:id/reply", auth, (()=>{}));

router.post("/:id/like", auth, likePost);

router.delete("/:id/like", auth, unlikePost);

router.get("/:id/liking_users", auth, getPostLikes);

// TODO not yet implemented
router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

export default router;
