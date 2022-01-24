import express from "express"
import { createPost, getPosts, deletePost, followUser } from '../db.js'

const router = express.Router()

router.post('/create', async (req, res) => {
    const username = req.body.username;
    const post = req.body.post;
    const response = await createPost(username, post)
    res.send(response)
})

router.patch(':/id', (req, res) => {
    const { id } = req.params
})

router.delete('/:id', async (req, res) => {
    const username = req.body.username;
    const id = req.params.id
    const response = await deletePost(username, id)
    res.send(response)
})


export default router