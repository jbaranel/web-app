import express from "express"
import { createPost, getPost, updatePost, deletePost, getPosts } from '../controllers/post.controller.js'
import auth from "../middleware/auth.js"

const router = express.Router()

router.post('/create', auth, createPost)

router.get('/all', auth, getPosts)

router.get('/:id', auth, getPost)

//TODO not yet implemented
router.patch('/:id', auth, updatePost)

router.delete('/:id', auth, deletePost)


export default router