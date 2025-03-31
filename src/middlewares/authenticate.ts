import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import { verify } from "jsonwebtoken"
import { authConfig } from "../configs/auth"


interface TokenPayLoad{

    id: number,
    role: string

}


export function authenticate(request: Request, response: Response, next: NextFunction){

    const authHeader = request.headers.authorization

        if (!authHeader) {
            
            throw new AppError('Token not found.')
        }

        const [, token ] = authHeader?.split(' ')
        

        const {id, role} = verify(token, authConfig.jwt.secret) as TokenPayLoad

        request.user = {
            id: id,
            role: role
        }


        return next()
}