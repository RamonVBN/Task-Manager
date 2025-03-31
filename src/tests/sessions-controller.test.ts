
import {app} from '../app'
import request  from 'supertest'
import { prisma } from '../database/prisma'



describe('sessions-controller', () => {

    let user_id: number
    
        afterAll(async () => {
    
            await prisma.user.delete({where: {id: user_id}})
        })

    it('should create a new session', async () => {

         const userResponse = await request(app).post('/users').send({
            name: 'test user2',
            email: 'testuser2@email.com',
            password: '123456'
        })

        user_id = userResponse.body.id


        const response = await request(app).post('/sessions').send({
            email: 'testuser2@email.com',
            password: '123456'
        })
        
        expect(response.status).toBe(201)
        expect(response.body.token).toEqual(expect.any(String))
    })

})