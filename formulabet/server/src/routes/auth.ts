import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"
import { Axios } from "axios"
import axios from 'axios';
import https from 'https';
import crypto from 'crypto';

export async function authRoutes(fastify: FastifyInstance){
    

    const api = axios.create({
        httpsAgent: new https.Agent({
            secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
        }),
    })


    fastify.get('/me',
    {
        onRequest:[authenticate]
    }, async(request)=>{
            return {user: request.user}
    })


    fastify.post('/users', async(request)=>{
        
        const createUserBody = z.object({
            access_Token: z.string(),
            

        })
        
        const{access_Token}=createUserBody.parse(request.body)
        
        try{
            
            
        /*const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${access_token}`,
            }
        })*/
        const { data } = await api.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_Token}`,
            }
        })
        
        const userData = data//await userResponse.json()
        
        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name:z.string(),
            picture:z.string().url(),
        })

        const userInfo=userInfoSchema.parse(userData)
       
        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id
            }
        })
        if(!user) {
            user = await prisma.user.create({
                data:{
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture
                }
            })
        }
        
        const token = fastify.jwt.sign({
            name:user.name,
            avatarUrl:user.avatarUrl
        },{
            sub: user.id,
            expiresIn:'7 days',
        })
       
        return {token}
    }catch(error){
        console.log("ERRO!!!!!!!!!!!!!!",error)
        return {error: 'Invalid access token'}
    }
    })
}
