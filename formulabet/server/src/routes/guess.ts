import { FastifyInstance } from "fastify"
import { date, z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function guessRoutes(fastify: FastifyInstance){
    fastify.get('/guesses/count', async()=> {
        const count = await prisma.user.count()

        return {count}
    })
    fastify.post('/pools/:poolId/races/:raceId/guesses',{
        onRequest:[authenticate]
    },async(request,reply)=>{
        const createGuessParams = z.object({
            poolId:z.string(),
            raceId:z.string()
        })
        const createGuessBody = z.object({
            Winner:z.string(),
            polePosition:z.string(),
            fastestLap:z.string()
        })

        const{poolId,raceId}= createGuessParams.parse(request.params)
        const{Winner,polePosition,fastestLap} = createGuessBody.parse(request.body)

        const participant = await prisma.participant.findUnique({
            where:{
                userId_poolId: {
                    poolId,
                    userId: request.user.sub
                }
            }
        })

        if(!participant){
            return reply.status(400).send({
                message:"You're not allowed to create a guess inside this poll."
            })
        }

        const guess = await prisma.guess.findUnique({
            where:{
                participantId_raceId: {
                    participantId: participant.id,
                    raceId
                }
            }
        })

        if(guess){
            return reply.status(400).send({
                message:"You already sent a guess to this race on this poll"
            })
        }

        const race = await prisma.race.findUnique({
            where:{
                id:raceId,
            }
        })

        if(!race){
            return reply.status(400).send({
                message:"Race not found."
            })
        }

        if(race.date < new Date()){
            return reply.status(400).send({
                message:"You cannot send guesses after the race."
            })
        }

        await prisma.guess.create({
            data:{
                raceId,
                participantId: participant.id,
                Winner,
                polePosition,
                fastestLap
            }
        })

        return reply.status(201).send
    })
}