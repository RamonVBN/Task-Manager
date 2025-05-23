import {z} from 'zod'

const envSchema = z.object({

    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    PORT: z.coerce.number()
})


export const env = envSchema.parse(process.env)