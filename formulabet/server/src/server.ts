import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool'
import { authRoutes } from './routes/auth'
import { guessRoutes } from './routes/guess'
import { raceRoutes } from './routes/race'
import { userRoutes } from './routes/user'

async function bootstrap(){
    const fastify = Fastify({
        logger: true
    })
    await fastify.register(cors,{
        origin: true
    })

    await fastify.register(jwt,{
        secret: 'formulabettokenjwt',
    })
    
    await fastify.register(poolRoutes)
    await fastify.register(authRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(userRoutes)
    await fastify.register(raceRoutes)

    
    await fastify.listen({
        
        port: 3333})

}

bootstrap()