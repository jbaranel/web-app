import express from "express"
import { getUser, followUser } from "../controllers/user.controller.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get('/:username', auth, getUser)

router.post('/:username/follow', auth, followUser)

export default router