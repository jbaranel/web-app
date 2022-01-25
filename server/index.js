import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './api/routes/user.js'
import postRoute from './api/routes/post.js'
import homeRoute from './api/routes/home.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/', homeRoute)

app.listen(port, () => {
    console.log(`API running on port:${port}`)
})
