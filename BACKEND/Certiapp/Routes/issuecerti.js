import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'

const adminauth=Router()
const certi = new Map()

adminauth.post('/issue',authenticate,(req,res)=>
    {
        try{
    
            if(req.Roles=='admin')
            {
                const {CourseName,CertificateId,CandidateName,Grade,Issuedate} = req.body
    
                if(certi.get(CertificateId))
                    {
                        res.status(400).send("Certificate already issued")
                    }
                else
                    {
                        certi.set(CertificateId,{CourseName,CandidateName,Grade,Issuedate})
                        res.status(201).send("Successfully issued a Certificate")
                        console.log(certi.get(CertificateId))
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
    

//View certificate

adminauth.get('/view',(req,res)=>
    {
        try{
            const certi_id=req.query.certificateid 
            const result=certi.get(certi_id)
            if(result)
            {
                res.send(result)
                console.log(result)
               
               
            }
            else
            {
                res.status(400).send("Certificate not available")
            }
        }
        catch
        {
            res.status(500).send("Internal server error")
        }
    })

export {adminauth}