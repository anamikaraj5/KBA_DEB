import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'
import { admincheck } from '../Middleware/admin.js'
import { course } from '../schemas/schema2.js'
import {upload} from '../Middleware/upload1.js'

const adminauth=Router()

adminauth.post('/addcourse',authenticate,upload.single('courseimg'),async(req,res)=>
    {
        try{
    
            if(req.Roles=='admin')
            {
                const {CourseName,CourseId,CourseType,Description,Price} = req.body
           
                //mongodb object - ivdthe result
                const result = await course.findOne({coursename:CourseName})  
    
                if(result)
                    {
                    
                        res.status(400).send("Course already added")
                    }
                else
                    {
                        const imagepath = req.file?req.file.path:""
                        const newcourse = new course(
                            {
                                
                                coursename:CourseName,
                                courseid:CourseId,
                                coursetype:CourseType,
                                description:Description,
                                price:Price,
                                image:imagepath
                            }
                        )
            
                        await newcourse.save()
                        res.status(201).send("Successful added a Course")
              
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



//using query
adminauth.get('/getcourse',async(req,res)=>
{
    try{
        const name=req.query.coursename 

        const result = await course.findOne({coursename:name})

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

adminauth.put('/updatecourse',authenticate,async(req,res)=>
{
    if(req.Roles=='admin')
    {
        const {CourseName,CourseId,CourseType,Description,Price} = req.body
        
        const result = await course.findOne({coursename:CourseName})
        if(result)
            {
                result.courseid=CourseId,
                result.coursetype=CourseType,
                result.description=Description,
                result.price=Price

                await result.save()
                res.status(200).send("Updated successfully...")
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

adminauth.patch('/updatecourse2',authenticate,admincheck,async(req,res)=>
{
        const {CourseName,CourseType,Price} =req.body
        const result = await course.findOne({coursename:CourseName})
     
        if(result)
        {
                result.coursetype=CourseType,
                result.price=Price

                await result.save()
                res.status(200).send("Updated successfully...")
        }
        else
            {
                res.status(404).send("Course not found")
            }

})

//DELETE
//delete course

adminauth.delete('/deletecourse',authenticate,admincheck,async(req,res)=>
{
    const name=req.query.coursename
    
    const result=await course.findOne({coursename:name})
    if(result)
    {
        await course.findOneAndDelete({coursename:name})
        res.status(200).send("Course deleted")
    }
    else
    {
        res.status(404).send("Course not found")
    }

})

export {adminauth}