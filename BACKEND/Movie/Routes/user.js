import { Router } from "express";
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const user=Router()

const users = new Map()

user.post('/signup',async(req,res)=>
{
    try
    {
        const {Name,Email,Role,Password} =req.body

        if(users.get(Email))
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd = await bcrypt.hash(Password,10)

            users.set(Email,{Name,Role,Password:newpswd})
            res.status(201).send("Successfully signe up")
            console.log(users.get(Email))
        }
    }
    catch
    {
        res.status(500).send("Internal serevr error")
    }
})

user.post('/login',async(req,res)=>
{
    try
    {
        const {Email,Password} = req.body
        const result = users.get(Email)

        if(result)
        {
            const compare1 = await bcrypt.compare(Password,result.Password)
            if(compare1)
            {
                const token= jwt.sign({Email:Email,Role:result.Role},process.env.SECRET_KEY,{expiresIn:'1h'})
                console.log(token)
                res.cookie('usertoken',token,{httpOnly:true})
                res.status(200).send("Successfulyy logged in")
            }
            else
            {
                res.status(401).send("Unauthorized access")
            }
        }
        else
        {
            res.status(400).send("Email not registered")
        }
    }
    catch
    {
        res.status(500).send("Internal server error")
    }
})
export {user}