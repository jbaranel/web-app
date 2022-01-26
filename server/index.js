import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './api/routes/user.route.js'
import postRoute from './api/routes/post.route.js'
import homeRoute from './api/routes/home.route.js'
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
