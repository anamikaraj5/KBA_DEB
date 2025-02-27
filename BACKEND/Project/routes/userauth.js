import {Router} from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userauth = Router()
const user= new Map()

dotenv.config()

//SIGNUP 

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
            const newpswd = await bcrypt.hash(Password,10)
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


//LOGIN

userauth.post('/login',async(req,res)=>
{
    try{
        const {Email,Password} = req.body 
        const result= user.get(Email)
        if(Email)
        {
            const valid= await bcrypt.compare(Password,result.Password)
            if(valid)
            {
                const token = jwt.sign({Email:Email,Role:result.Role},process.env.SECRET_KEY,{expiresIn:'2h'})
                res.cookie('userauthtoken',token,{httpOnly:true})
                res.status(200).send("Successfully logged in....")
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

    catch{
        res.status(500).send("Internal server error")
    }
})


//LOGOUT

userauth.get('/logout',(req,res)=>
{
    res.clearCookie("userauthtoken")
    res.status(200).send("Logging out .....")
})

export {userauth}