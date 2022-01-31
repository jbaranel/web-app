import express from "express"
import { createPost, getPost, updatePost, deletePost, getPosts, commentOnPost, getUserPosts } from '../controllers/post.controller'
import auth from "../middleware/auth"

const router = express.Router()

router.post('/create', auth, createPost)

router.get('/all', auth, getPosts)

router.get('/userPosts', auth, getUserPosts)

router.get('/:id', auth, getPost)

router.post('/:id/reply', auth, commentOnPost)

//TODO not yet implemented
router.patch('/:id', auth, updatePost)

router.delete('/:id', auth, deletePost)


export default router