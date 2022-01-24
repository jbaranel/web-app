import { createUser, getUser, createPost, getPosts, deletePost, followUser } from './db.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send({
        "Response": "success"
    })
})

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await getUser(username)    
    if (user.message) {
        res.send(user)
    }
    else {
        bcrypt.compare(password, user.password, (error, response) => {
            if(response){
                res.send(user)
            }
            else {
                res.send({"message": "Incorrect password"})
            }
        })       
    }
})

app.post('/user', async (req, res) => {
    const body = req.body;
    const response = await createUser(body)
    res.send(response)
})

//TODO should disable this function and use a different getUser function
app.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const response = await getUser(username)
    res.send(response)    
})

app.post('/user/:username/follow', async (req, res) => {
    const username = req.params.username;
    const follow = req.body.username
    const response = await followUser(username, follow)
    res.send(response)
})

app.post('/createPost', async (req, res) => {
    const username = req.body.username;
    const post = req.body.post;
    const response = await createPost(username, post)
    res.send(response)
})

app.post('/posts', async (req, res) => {
    const username = req.body.username;
    const response = await getPosts(username)
    res.send(response)
})


app.delete('/post/:id', async (req, res) => {
    const username = req.body.username;
    const id = req.params.id
    const response = await deletePost(username, id)
    res.send(response)
})

app.listen(port, () => {
    console.log(`API running on port:${port}`)
})
