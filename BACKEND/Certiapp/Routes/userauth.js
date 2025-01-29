import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {authenticate} from '../Middleware/auth.js'


dotenv.config()

const userauth=Router()

const user = new Map()

//signup page
userauth.post('/signup',async(req,res)=>
{
    try{

        const {Name,Email,Password,Roles} = req.body
    
        if(user.get(Email))
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd= await bcrypt.hash(Password,10)

            user.set(Email,{Name,Password:newpswd,Roles})
            res.status(201).send("Successful Registration")
            console.log(user.get(Email))
        }   
    }

    catch
    {
        res.status(500).send("Internal Server error")
    }
        
})



//login page
userauth.post('/login', async (req,res)=>
{
    try
    {
        const {Email,Password} = req.body
        const result= user.get(Email)
        
        if(result)
        {
       
            const compare1 = await bcrypt.compare(Password,result.Password)

            if (compare1)
            {
                const token = jwt.sign({Email:Email,Roles:result.Roles},process.env.SECRET_KEY,{expiresIn:'1h'})
                console.log(token)
                res.cookie('userauthtoken',token,{httpOnly:true})
                res.status(200).send("Login Successfull")
            }
            else{
                res.status(401).send("Unauthorized access")
            }


        }
        else{
            res.status(400).send("Email not registered")
        }
    }

    catch
    {
        res.status(500).send("Internal Server error")
    }
})


export {userauth}