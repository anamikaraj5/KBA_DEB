import {Router} from 'express'
import {authenticate} from '../Middleware/authenticate.js'
import { admincheck } from '../Middleware/admincheck.js'
import { books } from '../schemas/schema2.js'

const adminauth=Router()

//addbook
adminauth.post('/addbook',authenticate,async(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {BookName,BookId,Genre,Author,Date,Description} = req.body
               
                const result = await books.findOne({bookid:BookId})  
    
                if(result)
                    {
                    
                        res.status(400).send("Book already added!!!")
                    }
                else
                    {
                        // const imagepath = req.file?req.file.path:""
                        const newbook = new books(
                            {
                                
                                bookname:BookName,
                                bookid:BookId,
                                genre:Genre,
                                author:Author,
                                dates:Date,
                                description:Description
                                // image:imagepath
                            }
                        )
            
                        await newbook.save()
                        res.status(201).send("Successful added a Book!!!")
              
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

adminauth.get('/viewbook',async(req,res)=>
    {
        try{
                const book_id=req.query.bookid 
                const result = await books.findOne({bookid:book_id})

                if(result)
                {
                    res.send(result)
                    console.log(result)
                
                }
                else
                {
                    res.status(400).send("Book not found!!!!")
                }
            }
        catch
        {
            res.status(500).send("Internal server error")
        }
})
    

//update

adminauth.put('/updatebook',authenticate,async(req,res)=>
    {
        try{
    
            if(req.Role=='admin')
            {
                const {BookName,BookId,Genre,Author,Date,Description} = req.body
               
                const result = await books.findOne({bookid:BookId})
                if(result)
                    {
                        result.bookname=BookName,
                        result.bookid=BookId,
                        result.genre=Genre,
                        result.author=Author,
                        result.dates=Date,
                        result.description=Description

                        await result.save()
                        res.status(200).send("Updated successfully...")
                    }
                else
                    {
                        res.status(400).send("Book not found!!!")
                    }
            }
            else
            {
                res.status(401).send("Unauthorized access")
            }
        }

        catch
        {
            res.status(500).send("Internal server error")
        }

})
    

//delete 

adminauth.delete('/deletebook',authenticate,admincheck,async(req,res)=>
{
    const bookid = req.query.bid
    
    const result=await books.findOne({bookid:bookid})
    if(result)
    {
        await books.findOneAndDelete({bookid:bookid})
        res.status(200).send("Book deleted.......")
    }
    else
    {
        res.status(404).send("Book not found!!!")
    }

})

export {adminauth}