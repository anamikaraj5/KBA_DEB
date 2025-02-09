import {Router} from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { details } from '../Schema/account.js'
import { authenticate } from '../middleware/authenticate.js'

const userauth = Router()

dotenv.config()

//SIGNUP 

userauth.post('/signup',async(req,res)=>
{
    try{
        const {FullName,Email,Phone,Password} = req.body

        const result = await details.findOne({email:Email})
        if(result)
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd = await bcrypt.hash(Password,10)
            const newuser = new details(
                {
                    fullname:FullName,
                    email:Email,
                    phone:Phone,
                    password:newpswd
                }
            )

            await newuser.save()
            res.status(201).send("Successfully Registered....")
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
        
        const result = await details.findOne({email:Email})
        if(result)
        {
            const valid= await bcrypt.compare(Password,result.password)
            if(valid)
            {
                const token = jwt.sign({Email:Email},process.env.SECRET_KEY,{expiresIn:'7h'})
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


//VIEW PROFILE

userauth.get('/viewprofile',authenticate,async(req,res)=>
        {
            try{
                const email1=req.query.emailid
        
                const result = await details.findOne({email:email1})
        
                if(result)
                {
                    res.json({
                        fullname:result.fullname,
                        email:result.email,
                        phone:result.phone
                    })
                }
                else
                {
                    res.status(400).send("User  not found")
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
    res.clearCookie("userauthtoken")
    res.status(200).send("Logging out .....")
})

export {userauth}