import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'
import { admincheck } from '../Middleware/admin.js'
import { course } from '../schemas/schema2.js'
import { upload } from '../Middleware/upload1.js'

const adminauth = Router()

const convertToBase64=(buffer)=>{
    return buffer.toString("base64")
}



adminauth.post('/addcourse1',authenticate,upload.single('courseimg'),async(req,res)=>
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
                        let imageBase64 = null
                        if(req.file && req.file.buffer)
                        {
                            imageBase64=convertToBase64(req.file.buffer)
                        }

                      
                            
                            const newcourse = new course(
                                {
                                    
                                    coursename:CourseName,
                                    courseid:CourseId,
                                    coursetype:CourseType,
                                    description:Description,
                                    price:Price,
                                    image:imageBase64
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

    export {adminauth}
                    