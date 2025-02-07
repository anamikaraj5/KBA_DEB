//importing route fn from express
import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {authenticate} from '../Middleware/auth.js'
import { sample } from '../schemas/schema1.js'


dotenv.config()

const userauth=Router()

//signup page
userauth.post('/signup',async(req,res)=>
{
    try{

        const {Name,Email,Password,Roles} = req.body
        console.log(Email);

        const exisistinguser = await sample.findOne({email:Email}) //variable from schema : variable from postman
        
        if(exisistinguser)
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd= await bcrypt.hash(Password,10)
            const newuser = new sample(
                {
                    //schema:postman
                    name:Name,
                    email:Email,
                    password:newpswd,
                    roles:Roles
                }
            )

            //save user to database
            await newuser.save()
            res.status(201).send("Successful Registration")
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
        console.log(Email);
     
        const result = await sample.findOne({email:Email})   

        if(result)
        { 
            const compare1 = await bcrypt.compare(Password,result.password)
        
            if (compare1)
            {
                const token = jwt.sign({Email:Email,Roles:result.roles},process.env.SECRET_KEY,{expiresIn:'1h'})
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



//add course

// userauth.post('/addcourse',authenticate,(req,res)=>
// {
//     try{

//         if(req.Roles=='admin')
//         {
//             const {CourseName,CourseId,CourseType,Description,Price} = req.body
//             // console.log(CourseName,CourseId,CourseType,Description,Price)

//             if(course.get(CourseName))
//                 {
//                     // res.status(400).json({msg:"Course already added"})
//                     res.status(400).send("Course already added")
//                 }
//             else
//                 {
//                     course.set(CourseName,{CourseId,CourseType,Description,Price})
//                     res.status(201).send("Successful added a Course")
//                     console.log(course.get(CourseName))
//                 }
//         }

//         else
//        {
//             res.status(401).send("Unauthorized access")
//        }
//     }

    
//     catch
//     {
//         res.status(500).send("Internal Server error")
//     }
    
    
  
// })


//logout

userauth.get('/logout',(req,res)=>
{
    res.clearCookie('userauthtoken')
    res.status(200).send("Logged Out.....")
})

export {userauth}