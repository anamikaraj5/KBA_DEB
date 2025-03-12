import { Router } from "express"
import { student } from "./schema.js"

const route1 = Router()

//Adding student record

route1.post('/addstudent',async(req,res)=>
{
    try{
        const {Student_name,Enrollment_no,Course,Date} = req.body

        const existing = await student.findOne({enrollment_no:Enrollment_no})

        if(existing)
        {
            res.status(400).send("Student details already added!!!")
        }
        else
        {
            const newstudent  = new student({
                student_name:Student_name,
                enrollment_no:Enrollment_no,
                course:Course,
                date:Date
            })

            await newstudent.save()
            console.log(newstudent)
            res.status(201).send("Successfully added a student record......")
        }
    }
    catch
    {
        res.status(500).send("Internal server error!!!")
    }
})



//Searching for students by course

route1.get('/viewdata',async(req,res)=>
{
    try
    {
        const coursename = req.query.course_name

        const existing = await student.find({course:coursename})

        if(existing)
        {
            res.send(existing)
        }
        else
        {
            res.status(400).send("Course not found!!!")
        }
    }
    catch
    {
        res.status(500).send("Internal server error!!!")
    }
})


//searching for all student details
route1.get('/viewdata2',async(req,res)=>
    {
        try
        {
            const result = await student.find()
    
            if(result)
            {
                res.send(result)
            }
            else 
            {
                res.status(400).send("No data to be displayed!!!")
            }
        }
        catch
        {
            res.status(500).send("Internal server error!!!")
        }
    })



//updaing student record

route1.put('/updatestudent',async(req,res)=>
    {
        try{
            const {Student_name,Enrollment_no,Course,Date} = req.body
    
            const existing = await student.findOne({enrollment_no:Enrollment_no})
    
            if(existing)
            {
                existing.student_name=Student_name,
                // existing.enrollment_no=Enrollment_no,
                existing.course = Course,
                existing.date = Date

                await existing.save()
                console.log(existing)
                res.status(200).send("Successfully updated a student record")
            }
            else
            {
                res.status(400).send("Student details not found!!!")
            }
        }
        catch(error)
        {
            console.log(error)
            res.status(500).send("Internal server error!!!")
        }
    })



//deleting a student record

route1.delete('/deletestudent',async(req,res)=>
{
    try
    {
        const studentid = req.query.student_id

        const result = await student.findOne({enrollment_no:studentid})

        if(result)
        {
            await student.findOneAndDelete({enrollment_no:studentid})
            res.status(200).send("Successfully deleted a student record....")
        }
        else
        {
            res.status(400).send("Student not found!!!")
        }
    }
    catch
    {
        res.status(500).send("Internal server error!!!")
    }
})

export {route1}