import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {authenticate} from '../Middleware/authenticate.js'


dotenv.config()

const userauth=Router()

const user = new Map()

//signup page
userauth.post('/signup',async(req,res)=>
{
    try{

        const {FullName,Role,Username,Email,Password} = req.body
    
        if(user.get(Username))
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd= await bcrypt.hash(Password,10)

            user.set(Username,{FullName,Role,Email,Password:newpswd})
            res.status(201).send("Successful Registration")
            console.log(user.get(Username))
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
        const {Username,Password} = req.body
        const result= user.get(Username)
        
        if(result)
        {
       
            const compare1 = await bcrypt.compare(Password,result.Password)

            if (compare1)
            {
                const token = jwt.sign({Name:Username,Role:result.Role},process.env.SECRET_KEY,{expiresIn:'1h'})
                console.log(token)
                res.cookie('userauthtoken',token,{httpOnly:true})
                res.status(200).send("Login Successfull")
            }
            else{
                res.status(401).send("Unauthorized access")
            }


        }
        else{
            res.status(400).send("Username not found")
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