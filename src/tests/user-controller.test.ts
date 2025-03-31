
import {app} from '../app'
import request  from 'supertest'
import { prisma } from '../database/prisma'

describe('User controller', () => {
    let user_id: number

    afterAll(async () => {

        await prisma.user.delete({where: {id: user_id}})
    })

    it('should create a new user', async () => {

        const response = await request(app).post('/users').send({
            name: 'test user',
            email: 'testuser@email.com',
            password: '123456'
        })

        user_id = response.body.id

        expect(response.status).toBe(201)

    })

    it('should a throw an error', async () => {

        const response = await request(app).post('/users').send({
            name: 'test user',
            email: 'testuser@email.com',
            password: '123456'
        })

        
        expect(response.status).toBe(400)
    })

    it('should a throw an error if the email is invalid', async () => {

        const response = await request(app).post('/users').send({
            name: 'test user',
            email: 'testuser-email.com',
            password: '123456'
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Validation Error')
    })
})