import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'
import { admincheck } from '../Middleware/admin.js'

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
                        course.set(CourseName,{CourseName,CourseId,CourseType,Description,Price})
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

//VIEW - READ
//GET METHOD

//using params
// adminauth.get('/getcourse/:cname',(req,res)=>
// {
//     const name=req.params.cname
//     console.log(name)
// })


//using query
adminauth.get('/getcourse',(req,res)=>
{
    try{
        const name=req.query.coursename //coursename - any variable name
        const result=course.get(name)
        if(result)
        {
            res.send(result)
            console.log(result)
           
           
        }
        else
        {
            res.status(400).send("Course not found")
        }
    }
    catch
    {
        res.status(500).send("Internal server error")
    }
})

//UPDATE
//PUT METHOD

adminauth.put('/updatecourse',authenticate,(req,res)=>
{
    if(req.Roles=='admin')
    {
        const {CourseName,CourseId,CourseType,Description,Price} = req.body
        //we can update only when a course exists
        if(course.get(CourseName))
            {
                course.set(CourseName,{CourseName,CourseId,CourseType,Description,Price})
                res.status(200).send("Successfully Updated a Course")
                console.log(course.get(CourseName))
            }
        else
            {
                res.status(400).send("Course not found")
            }
    }
    else
    {
         res.status(401).send("Unauthorized access")
    }
    
})

//patch

adminauth.patch('/updatecourse2',authenticate,admincheck,(req,res)=>
{
        const {CourseName,CourseType,Price} =req.body
        const result = course.get(CourseName)
     
        if(result)
        {
            course.set(CourseName,{CourseName,CourseId:result.CourseId,CourseType,Description:result.Description,Price})
            res.status(200).send("Successfully Updated a Course")
            console.log(course.get(CourseName))
        }
        else
            {
                res.status(404).send("Course not found")
            }

})

//DELETE
//delete course

adminauth.delete('/deletecourse',authenticate,admincheck,(req,res)=>
{
    const name=req.query.coursename
    // console.log(name)
    const result=course.get(name)
    if(result)
    {
        course.delete(name)
        res.status(200).send("Course deleted")
    }
    else
    {
        res.status(404).send("Course not found")
    }

})

export {adminauth}