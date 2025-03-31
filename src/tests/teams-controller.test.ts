import {app} from '../app'
import request  from 'supertest'
import { prisma } from '../database/prisma'


describe('Teams controller', () => {

    let team_id:number

    afterAll(async ()=>{
        await prisma.team.delete({where: {id: team_id}})
    })

    it('Should create a new team', async () => {

        const response = await request(app).post('/sessions').send({
            email: 'ramon@email.com', // user with admin role(only admin could create a team).
            password: '123456'
        })

        const token = `Bearer ${response.body.token}`
        
        

        // const base = {'Authorization': token, 'Content-Type': 'application/json'}

        const teamsResponse = await request(app).post('/teams').set('Authorization', token)
        .send({
            name: "newteam12133",
            description: "fdasdsadasdasa"
        })

        team_id = teamsResponse.body.id

        expect(response.status).toBe(201)
        expect(teamsResponse.status).toBe(201)

    })


})
