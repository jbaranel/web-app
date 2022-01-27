import express from 'express'
import cors from 'cors'
import userRoute from './api/routes/user.route.js'
import postRoute from './api/routes/post.route.js'
import homeRoute from './api/routes/home.route.js'
import config from './config.js'

const app = express()
const port = config.PORT || 3001

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
