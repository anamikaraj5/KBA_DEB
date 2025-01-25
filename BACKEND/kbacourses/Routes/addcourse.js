import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'

const adminauth=Router()
const course = new Map()

adminauth.post('/addcourse',authenticate,(req,res)=>
    {
        try{
    
            if(req.Roles=='admin')
            {
                const {CourseName,CourseId,CourseType,Description,Price} = req.body
                // console.log(CourseName,CourseId,CourseType,Description,Price)
    
                if(course.get(CourseName))
                    {
                        // res.status(400).json({msg:"Course already added"})
                        res.status(400).send("Course already added")
                    }
                else
                    {
                        course.set(CourseName,{CourseId,CourseType,Description,Price})
                        res.status(201).send("Successful added a Course")
                        console.log(course.get(CourseName))
                    }
            }
    
            else
           {
                res.status(401).send("Unauthorized access")
           }
        }
    
        
        catch
        {
            res.status(500).send("Internal Server error")
        }
        
        
      
    })
    
export {adminauth}