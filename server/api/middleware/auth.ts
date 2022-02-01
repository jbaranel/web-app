import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"

export default function authenticate(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({message:"Missing auth token"})
    }
    const secret: string = process.env.JWT_SECRET ?? ""
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).send({})
        }
        req.user = user
        next()
    })
}