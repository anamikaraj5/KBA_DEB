import { authenticate } from "../middleware/auth.js"
import { courses } from "../Schemas/schema2.js"
import { Router } from "express"
import { upload } from "../middleware/Img.js"

const adminauth = Router()

const converttobase64 = (buffer)=>
    {
        return buffer.toString('base64')
    }

adminauth.post('/addbook',authenticate,upload.single('image1'),async(req,res)=>
{
    try
    {


        if(req.Roles=='admin')
            {
                const {Coursename,Courseid,Description,Price} = req.body
        
                const result = await courses.findOne({coursename:Coursename})
                 if(result)
                 {
                    res.status(400).send("Course already added")
                 }
                 else
                 {

                    let imagebase64=null
                    if(req.file)
                    {
                        imagebase64 = converttobase64(req.file.buffer)
                    }
                    const newcourse = new courses(
                        {
                            coursename:Coursename,
                            courseid:Courseid,
                            description:Description,
                            price:Price,
                            image:imagebase64
                        }
                    )

                    await newcourse.save()
                 }
            }
        else
        {
            res.status(401).send("Unauthorized access")
        }
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("Internal Server error")
    }
   
})


adminauth.post('/updatebook',authenticate,async(req,res)=>
{
    try
    {

        if(req.Roles=='admin')
            {
                const {Coursename,Courseid,Description,Price} = req.body
        
                const result = await courses.findOne({coursename:Coursename})
                 if(result)
                 {
                    result.coursename=Coursename,
                    result.courseid=Courseid,
                    result.description=Description,
                    result.price=Price
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
    }
    catch
    {
        res.status(500).send("Internal Server error")
    }
})


adminauth.get('/viewbook',async(req,res)=>
{
    try
    {
        const courseidd = req.query.Courseid
        
        const result = await courses.findOne({courseid:courseidd})

        if(result)
        {
            res.send(result)
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

adminauth.delete('/deletebook',authenticate,async(req,res)=>
{
    if(req.Roles=='admin')
    {

        const courseidd = req.query.Courseid
        const result = await courses.findOne({courseid:courseidd})

        if(result)
        {
            await courses.findOneAndDelete({courseid:courseidd})
            res.status(200).send("Successfully deleted")
        }
        else
        {
            res.status(400).send("Course not found")
        }
    }
    else
    {
        res.status(401).send("Unauthorizedd access")
    }
})

export{adminauth}