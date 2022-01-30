import express from "express"
import { getUser, followUser, updateUser, generateUrl, getFollowers, searchUsername } from "../controllers/user.controller.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get('/avatarUpload', auth, generateUrl)

router.get('/:username', auth, getUser)

router.get('/', auth, getUser)

router.patch('/', auth, updateUser)

router.post('/:username/follow', auth, followUser)

router.get('/:username/followers', auth, getFollowers)

router.get('/search/:username', auth, searchUsername)

export default router