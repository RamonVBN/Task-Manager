
import { Request, response, Response } from "express";
import {number, z} from 'zod'
import {prisma} from '../database/prisma'
import { AppError } from "../utils/AppError";

export class TeamsController {

    async create(request: Request, response: Response){

       const bodySchema = z.object({
        name: z.string().trim().min(3),
        description: z.string().trim().min(6)
        })

        const {name, description} = bodySchema.parse(request.body)

        const teamWithSameName = await prisma.team.findFirst({where: {name}})

        if (teamWithSameName) {
            
            throw new AppError('A team with this name already exists.')
        }

        const team = await prisma.team.create({data: {name, description}})


        return response.status(201).json(team)

    }

    async index(request: Request, response: Response){

        const teams = await prisma.team.findMany()

       response.json({teams})
    }

    async update(request: Request, response: Response){

        const paramsSchema = z.object({
            id: z.coerce.number()
        })
        
        const {id} = paramsSchema.parse(request.params)


       const bodySchema = z.object({
        name: z.string().trim().min(3),
        description: z.string().trim().min(6)
        })

        

        const {name, description} = bodySchema.parse(request.body)

        await prisma.team.update({data: {name, description}, where: {id}})

        return response.json()
    }

    async remove(request: Request, response: Response){

        const paramsSchema = z.object({
            id: z.coerce.number()
        })
        
        const {id} = paramsSchema.parse(request.params)

        const team = await prisma.team.findFirst({where: {id}})

        if (!team) {
            
            throw new AppError(`A team with ID ${id} doesnt exist`)
            
        }

        const team_members = await prisma.team_Member.findMany({where: {team_id: id}})

        if (team_members) {
            
            await prisma.team_Member.deleteMany({where: {team_id: id}})

        }

        await prisma.team.delete({where: {id}})

        return response.json()
    }

}