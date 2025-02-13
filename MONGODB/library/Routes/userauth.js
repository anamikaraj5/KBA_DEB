import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {authenticate} from '../Middleware/authenticate.js'
import { users } from '../schemas/schema1.js'


dotenv.config()

const userauth=Router()


//signup page
userauth.post('/signup',async(req,res)=>
{
    try{

        const {FullName,Roles,UserName,Email,Password} = req.body
    
        const exisistinguser = await users.findOne({username:UserName}) //variable from schema : variable from postman
        
        if(exisistinguser)
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd= await bcrypt.hash(Password,10)
            const newuser = new users(
                {
                    name:FullName,
                    roles:Roles,
                    username:UserName,
                    email:Email,
                    password:newpswd
                    
                }
            )
            await newuser.save()
            res.status(201).send("Successful Registration")
        }
    }

    catch(error)
    {
        console.log(error)
        res.status(500).send("Internal Server error")
    }
        
})



//login page
userauth.post('/login', async (req,res)=>
{
    try
    {
        const {UserName,Password} = req.body
        
        const result = await users.findOne({username:UserName})   

        if(result)
        { 
            const compare1 = await bcrypt.compare(Password,result.password)
        
            if (compare1)
            {
                const token = jwt.sign({Name:UserName,Role:result.roles},process.env.SECRET_KEY,{expiresIn:'1h'})
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


//LOGOUT

userauth.get('/logout',(req,res)=>
{
    res.clearCookie('userauthtoken')
    res.status(200).send("Logged out...")
})

export {userauth}