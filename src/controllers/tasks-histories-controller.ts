import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { takeCoverage } from "v8";


export class TasksHistoriesController {

    async index(request: Request, response: Response){

       const tasks_histories = await prisma.task_History.findMany({
        include: {task: {select:
             {title: true, description: true}},user: {select: {name:true, email:true}}}
       })

       return response.json(tasks_histories)

    }

}