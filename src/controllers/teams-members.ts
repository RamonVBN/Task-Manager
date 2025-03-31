import { Request, Response } from "express";
import {z} from 'zod'
import {prisma} from '../database/prisma'
import { AppError } from "../utils/AppError";

export class TeamsMembersController {

    async create(request: Request, response: Response){

        const bodySchema = z.object({

            user_id: z.number().gte(1),
            team_id: z.number().gte(1)
        })

        const {user_id, team_id} = bodySchema.parse(request.body)

        await prisma.team_Member.create({data: {user_id, team_id}})

        return response.status(201).json()

    }

    async index(request: Request, response: Response){

        // const teams = await prisma.team_Member.findMany({
        //     select: {
        //         team: {select: {name: true}}, user: {select: {name: true, email: true, role: true}}},
        //         orderBy: {team_id: 'asc'}
        // })

        const teams = await prisma.team.findMany({
            select: {id: false, name: true, team_members: {
                select: {id: true, team_id:true, user_id: true, user: {
                    select: {name: true, email: true, role: true}
                }}
            }}
        })
           
        return response.json(teams)

    }

    async remove(request: Request, response: Response){

        const paramsSchema = z.object({
            id: z.coerce.number()
        })
        
        const {id} = paramsSchema.parse(request.params)

        const member = await prisma.team_Member.findFirst({where: {id}})

        if (!member) {
            
            throw new AppError('this member doesnt exist')
        }

        await prisma.team_Member.delete({where: {id}})

        return response.json()

    }

}