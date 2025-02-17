import { Router } from "express"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { users } from "../Schemas/schema1.js"

dotenv.config()

const userauth = Router()

//SIGNUP

userauth.post('/signup',async(req,res)=>
{
    try{

        const {Name,Email,Password,Roles} = req.body

        const result = await users.findOne({email:Email})
        if(result)
        {
            res.status(400).send("User already exists...")
        }
        else
        {
            const newpswd = await bcrypt.hash(Password,10)

            const newuser = new users(
                {
                    name:Name,
                    email:Email,
                    password:newpswd,
                    roles:Roles
                }
            )

            await newuser.save()
            res.status(201).send("User signed up successfully....")
    }
    }

    catch{
        res.status(500).send("INternal server error")
    }
    
})


//LOGIN 

userauth.post('/login',async(req,res)=>
{
    try
    {
        const {Email,Password} = req.body

        const result = await users.findOne({email:Email})
        if(result)
        {
            const valid = await bcrypt.compare(Password,result.password)
            if(valid)
            {
                const token = jwt.sign({Email:Email,Roles:result.roles},process.env.SECRET_KEY)
                res.cookie('userauthtoken',token,{httpOnly:true})
                res.status(200).send("User logged in ...")
            }
            else{
                res.status(401).send("Unauthorized access")
            }
        }
        else
        {
            res.status(400).send("User doesnot exist")
        }
    }
    
    catch
    {
        res.status(500).send("Internal server error")
    }
})


//LOGOUT

userauth.get('/logout',(req,res)=>
{
    res.clearCookie('usrauthtoken')
    res.status(200).send("Logged out....")
})

export {userauth}