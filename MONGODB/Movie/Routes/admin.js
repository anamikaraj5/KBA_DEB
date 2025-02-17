import {Router} from 'express'
import {authenticate} from '../Middleware/auth.js'
import { multiplex } from '../Schemas/multiplex.js'
import { movie } from '../Schemas/movies.js'

const admin=Router()


//movie details

admin.post('/addmovie',authenticate,async(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {MovieName,Shows,Language,Start,End,ScreenNo} = req.body
    
                const result = await movie.findOne({moviename:MovieName})
                if(result)
                    {
                        res.status(400).send("Movie already added")
                    }
                else
                    {
                        
                        const newmovie  = new movie({
                            moviename:MovieName,
                            shows_no:Shows,
                            language:Language,
                            startdate:Start,
                            enddate:End,
                            screen_no:ScreenNo
                        })

                        await newmovie.save()
                        res.status(201).send("Successfully added a movie")
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

admin.post('/addscreen',authenticate,async(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {ScreenNumber,Seats} = req.body

                const result= await multiplex.findOne({screen_no:ScreenNumber})
    
                if(result)
                    {
                        res.status(400).send("Screen details already added")
                    }
                else
                    {
                        const newscreen = new multiplex({
                            screen_no:ScreenNumber,
                            seats:Seats
                        })

                         await newscreen.save()
                        res.status(201).send("Successfully added screen details")
                        
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