import {Router} from 'express'
import {authenticate} from '../middleware/authenticate.js'
import { budgets } from '../Schema/budgets.js'
import { Expenses } from '../Schema/expenses.js'

const setbudget=Router()

setbudget.post('/setbudget',authenticate,async(req,res)=>
    {
        try{
    
                const {Category,Limit,Month} = req.body
           
                const result = await budgets.findOne({category:Category})  
    
                if(result)
                    {
                        res.status(400).send("Budget already added")
                    }
                else
                    {
                        const newbudget = new budgets(
                            {
                                
                                category:Category,
                                limit:Limit,
                                month:Month
                            }
                        )
            
                        await newbudget.save()
                        res.status(201).send("Successful added a budget.....")
              
                    }
            }
        
        
        catch
        {
            res.status(500).send("Internal Server error")
        }
          
})

setbudget.get('/viewbudget',async(req,res)=>
{
    try{
        const cat=req.query.category

        const data = await Expenses.find({category:cat})
        console.log(data);
        
        const result = await budgets.findOne({category:cat})

        if(result)
        {
            if(data.length>0)
            {
                console.log(data)
                const spent=data.amount
                const limits = result.limit
                const remaining = limits - spent 
                if(remaining<=0)
                {
                    return res.status(200).json({
                        category: result.category,
                        budget: limits,
                        spent: spent,
                        remaining: remaining,
                        message: "You have reached your budget limit!!!!!"
                    })
                }
                else{
                    res.status(200).json({ 
                        category:result.category,
                        budget:limits ,
                        spent: spent,
                        remaining: remaining})
                }
            }
            else
            {
                res.status(404).send("Expense details not found")
            }
        }
        else
        {
            res.status(400).send("Budget details not found")
        }
    }
    catch
    {
        res.status(500).send("Internal server error")
    }
})
export{setbudget}