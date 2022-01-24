import { createUser, createPost, getPosts, deletePost, followUser } from './api/db.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import userRoute from './api/routes/user.js'
import postRoute from './api/routes/post.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json());
app.use(cors({
    origin: '*'
}));


app.use('/user', userRoute)
app.use('/post', postRoute)

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
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

app.post('/posts', async (req, res) => {
    const username = req.body.username;
    const response = await getPosts(username)
    res.send(response)
})


app.listen(port, () => {
    console.log(`API running on port:${port}`)
})
