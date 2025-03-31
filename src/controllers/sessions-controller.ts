import { Request, Response } from "express";
import {z} from 'zod'
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { authConfig } from "../configs/auth";


export class SessionController {

    async create(request: Request, response: Response ){

    const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
        
    })

    const {email, password} = bodySchema.parse(request.body)
    
    const user = await prisma.user.findFirst({where: {email}})

    
    if (!user) {
        
        throw new AppError('Invalid email or password.', 400)
    }
    
    
    const passwordMatched = await compare(password, user?.password)

    if (!passwordMatched) {
        
        throw new AppError('Invalid email or password.', 400)
    }

    const {secret, expiresIn} = authConfig.jwt

    const token = sign({role: user.role, id: user.id, expiresIn}, secret)
    

    return response.status(201).json({token})
    }
}