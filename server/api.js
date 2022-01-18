import { createUser, getUser } from './db.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
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

app.post('/user', (req, res) => {
    const body = req.body;
    const response = createUser(body)
    .then((dbRes)=>{
        res.send(dbRes)
    })
    .catch((error) => {
        res.send(error)
    })
})

app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    const response = getUser(username)
    .then((dbRes) => {
        res.send(dbRes)
    })  
    .catch((error) => {
        res.send(error)
    })  
})

app.post('/login', (req, res) => {
    const body = req.body
    res.send("hi")
})

app.listen(port, () => {
    console.log(`API running on port:${port}`)
})