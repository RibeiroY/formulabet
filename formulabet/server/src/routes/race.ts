import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function raceRoutes(fastify: FastifyInstance){
    fastify.get('/pools/:id/races',{
        onRequest:[authenticate],
    },async request =>{
        const getPoolParams = z.object({
            id: z.string(),
        })

        const{id} = getPoolParams.parse(request.params)

        const races = await prisma.race.findMany({
            orderBy:{
                date: 'desc'
            },
            include:{
                guesses:{
                    where:{
                        participant:{
                            userId: request.user.sub,
                            poolId: id,
                        }
                    }
                }
            }
        })

        return {
            races: races.map(race =>{
                return{
                    ...race,
                    guess: race.guesses.length>0?race.guesses[0] : null,
                    guesses:undefined
                }
            })
        }
    })

    
    
}