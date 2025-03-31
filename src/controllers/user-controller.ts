import { Request, Response } from "express";
import { z } from 'zod'
import {hash} from 'bcrypt'
import { prisma } from '../database/prisma'
import { AppError } from "../utils/AppError";


export class UserController {

    async create(request: Request, response: Response ){

        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email(),
            password: z.string().min(6)

        })

        const {name, email, password} = bodySchema.parse(request.body)

        const hashedPassword = await hash(password, 8)

        const userWithSameEmail = await prisma.user.findFirst({where: {email}})

        if (userWithSameEmail) {
            
            throw new AppError('An user with this email already exists.', 400)
        }

        const new_user = await prisma.user.create({data: {name, email, password: hashedPassword}})

        return response.status(201).json(new_user)
    }

    async index(request: Request, response: Response ){

       const users = await prisma.user.findMany()

        return response.json(users)
    }

}