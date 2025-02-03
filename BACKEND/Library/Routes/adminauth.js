import {Router} from 'express'
import {authenticate} from '../Middleware/authenticate.js'
import { admincheck } from '../Middleware/admincheck.js'

const adminauth=Router()
const library = new Map()

//addbook

adminauth.post('/addbook',authenticate,(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {BookName,BookId,Genre,Author,Date,Description} = req.body
               
                if(library.get(BookId))
                    {
                        res.status(400).send("Book already added")
                    }
                else
                    {
                        library.set(BookId,{BookName,Genre,Author,Date,Description})
                        res.status(201).send("Successfully added a book")
                        console.log(library.get(BookId))
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

//viewbook    

adminauth.get('/viewbook',(req,res)=>
    {
        try{
                const book_id=req.query.bookid 
                const result=library.get(book_id)
                if(result)
                {
                    res.send(result)
                    console.log(result)
                   
                }
                else
                {
                    res.status(400).send("Book is not in the library")
                }
            }
        catch
            {
                res.status(500).send("Internal server error")
            }
    })
    

//update

adminauth.put('/updatebook',authenticate,(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {BookName,BookId,Genre,Author,Date,Description} = req.body
               
                if(library.get(BookId))
                    {
                        library.set(BookId,{BookName,Genre,Author,Date,Description})
                        res.status(201).send("Successfully updated a book")
                        console.log(library.get(BookId))
                    }
                else
                    {
                        res.status(400).send("Book not found")
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
    

//delete 

adminauth.delete('/deletebook',authenticate,admincheck,(req,res)=>
{
    const bookid = req.query.bid
    const result= library.get(bookid)
    if(result)
    {
        library.delete(bookid)
        res.status(200).send("Deleted a book")
    }
    else
    {
        res.status(404).send("Book not found")
    }
})

export {adminauth}