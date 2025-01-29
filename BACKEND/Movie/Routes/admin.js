import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'

const admin=Router()
const movies = new Map()

admin.post('/addmovie',authenticate,(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {MovieName,Shows,Language,Start,End} = req.body
    
                if(movies.get(MovieName))
                    {
                        res.status(400).send("Movie already added")
                    }
                else
                    {
                        movies.set(MovieName,{Shows,Language,Start,End})
                        res.status(201).send("Successful added a movie")
                        console.log(movies.get(MovieName))
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
    
export {admin}