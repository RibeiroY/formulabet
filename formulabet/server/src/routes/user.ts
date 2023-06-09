import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"

export async function userRoutes(fastify: FastifyInstance){
    fastify.get('/users/count', async()=> {
        const count = await prisma.guess.count()

        return {count}
    })
}