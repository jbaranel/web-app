import express from "express"
import { createUser, login } from '../controllers/auth.controller'

const router = express.Router()

router.post('/login', login)

router.post('/register', createUser)

export default router