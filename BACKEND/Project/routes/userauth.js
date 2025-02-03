import {Router} from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userauth = Router()
const user= new Map()

userauth.post('/signup',async(req,res)=>
{
    try{
        const {FullName,Email,Phone,Password} = req.body

        if(user.get(Email))
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd = await bcrypt.hash(Password)
            user.set(Email,{FullName,Phone,Password:newpswd})
            res.status(201).send("Successfully Registered....")
            console.log(user.get(Email))
        }
    }
    catch
    {
        res.status(500).send("Internal Server Error")
    }
})

export {userauth}