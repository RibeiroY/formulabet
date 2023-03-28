import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data:{
            name:'John Doe',
            email:'john.doe@gmail.com',
            avatarUrl:'https://github.com/ribeiroy.png'
        }
    })
    const pool = await prisma.pool.create({
        data:{
            title:'Example',
            code:'FBET123',
            ownerId:user.id,

            participants:{
                create:{
                    userId: user.id
                }
            }
        }
    })


    await prisma.race.create({
        data:{
            date : '2023-03-05T08:00:00.299Z',
            name: 'Grande Prêmio do Bahrein 2023',
            countryCode: 'BH'
        }
    })

    await prisma.race.create({
        data:{
            date : '2023-03-19T08:00:00.299Z',
            name: 'Grande Prêmio da Arábia Saudita 2023',
            countryCode: 'SA',

            guesses:{
                create:{
                    Winner: 'Charles Leclerc',
                    participant:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId:pool.id
                            }
                        }
                    }
                }
            }


        }
    })

}

main()