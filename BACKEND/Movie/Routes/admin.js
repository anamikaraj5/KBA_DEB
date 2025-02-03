import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'

const admin=Router()
const movies = new Map()
const screen = new Map()

//movie details

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


//screen details

admin.post('/addscreen',authenticate,(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {ScreenNumber,Balcony,Front,BalconyPrice,FrontPrice} = req.body
    
                if(screen.get(ScreenNumber))
                    {
                        res.status(400).send("Screen details already added")
                    }
                else
                    {
                        screen.set(ScreenNumber,{Balcony,Front,BalconyPrice,FrontPrice})
                        res.status(201).send("Successful added screen details")
                        console.log(screen.get(ScreenNumber))
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