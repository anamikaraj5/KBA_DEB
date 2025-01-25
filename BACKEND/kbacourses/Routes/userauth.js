//importing route fn from express
import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {authenticate} from '../Middleware/auth.js'


dotenv.config()

const userauth=Router()

const user = new Map()
const course = new Map()

//signup page
userauth.post('/signup',async(req,res)=>
{
    try{

    
    // console.log(req.body)

    //if we want to use other name or getting data using a variable
    // const data=req.body
    // console.log(data.FirstName)
    // user.set(data.Email,{Fname:data.FirstName,Lname:data.LastName,email:data.Email,pswd:data.Password})
    // console.log(user.get(data.Email))


    //same name given in body(postman) must be given here - destructuring
    const {FirstName,LastName,Roles,Email,Password} = req.body
    // console.log(FirstName,LastName,Email,Password)

    //before encryption making it as map
    // user.set(Email,{FirstName,LastName,Password})
    // console.log(user.get(Email))


    //checks the case of multiple emails/users
    if(user.get(Email))
    {
        res.status(400).send("User already exists")
    }
    else
    {
        //encryption of password
        const newpswd= await bcrypt.hash(Password,10)

        //after encryption
        user.set(Email,{FirstName,LastName,Roles,Password:newpswd})
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
            //comparing pswd entered while login and signin  
            const compare1 = await bcrypt.compare(Password,result.Password)
            // console.log(compare1)

            if (compare1)
            {
                //sign - used to create token,in payload 1 field must be unique , for signing secret key is used
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

export {userauth}