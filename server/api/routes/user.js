import express from "express"
import { createPost, getPosts, deletePost, followUser } from '../db.js'
import { getUser, createUser } from "../controllers/user.controller.js"

const router = express.Router()

router.post('/register', createUser)

router.get('/:username', getUser)

router.post('/:username/follow', async (req, res) => {
    const username = req.params.username;
    const follow = req.body.username
    const response = await followUser(username, follow)
    res.send(response)
})

export default router