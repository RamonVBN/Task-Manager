import { Request, Response } from "express";
import {z} from 'zod'
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";

export class TasksController {

    async index(request: Request, response: Response){

        if (request.user?.role === 'admin') {
            
            const tasks = await prisma.task.findMany({
                include: {user: {
                    select: {name: true, email: true, role: true}
                }, teams: {
                    select: {name: true}
                }}, orderBy: {team_id: 'asc'}
            })
    
            return response.json(tasks)
    
        }

        const team_member = await prisma.team_Member.findFirst({where: {user_id: request.user?.id}})

        if (!team_member) {
            
            throw new AppError('you are not yet a member of a team.')

        }

        const {team_id,} = team_member

        const tasks = await prisma.task.findMany({
            include: {user: {
                select: {name:true, email: true, role: true}
            }, teams: {
                select: {name: true}
            }} ,
            where: {team_id}
        })

        return response.json(tasks)

        } 


    async create(request: Request, response: Response){

        const bodySchema = z.object({
            title: z.string().min(4),
            description: z.string().min(6),
            priority: z.enum(['high', 'medium', 'low']),
            assigned_to: z.number().gte(1),
            team_id: z.number().gte(1)
        })


        const {title, description, priority, assigned_to, team_id} = bodySchema.parse(request.body)


        const team_member = await prisma.team_Member.findFirst({where: {user_id: assigned_to}})

        if (!team_member) {

            throw new AppError('This user is not anexed to a team')

        }

        await prisma.task.create({data: {title, description, priority, assigned_to, team_id}})

        return response.status(201).json()

    }

    async update(request: Request, response: Response){
        
        const bodySchema = z.object({
            new_status: z.enum(['pending', 'in_progress', 'completed'])
        })

        const paramsSchema = z.object({
            task_id: z.coerce.number()
        })

        const {task_id} = paramsSchema.parse(request.params)

        const {new_status} = bodySchema.parse(request.body)

        const task = await prisma.task.findFirst({where: {id: task_id}})

        if (!task) {
            
            throw new AppError('This task doesn exist')
        }

        const {status, assigned_to} = task

        if (request.user?.role === 'member' && request.user?.id !== assigned_to) {
            
            throw new AppError('You cannot update other members tasks.')
        }

        await prisma.task.update({data: {status: new_status}, where: {id: task_id}})

        await prisma.task_History.create({data: {task_id, changedBy: assigned_to, oldStatus: status, newStatus: new_status}})

        return response.json()
    }

    // async show(request: Request, response: Response){

    //     const team_member = await prisma.team_Member.findFirst({where: {user_id: request.user?.id}})

    //     return
    // }
}
