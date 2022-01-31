import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({message:"Missing auth token"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({})
        }
        req.user = user
        next()
    })
}