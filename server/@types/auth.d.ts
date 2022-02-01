import {Request, Express} from 'express'

declare namespace Express {
    export interface Request {
       user?: string
    }
 }