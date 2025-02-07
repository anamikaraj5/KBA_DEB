import {Router} from 'express'
import {authenticate} from '../middleware/authenticate.js'
import { Expenses } from '../Schema/expenses.js'

const expensetrack = new Router()

expensetrack.post('/addexpense',authenticate,async(req,res)=>
    {
        try{
                console.log("hiii")
                const {Category,Expense,Date} = req.body
           
                const result = await Expenses.findOne({date:Date,category:Category }) 
    
                if (result)
                {
                    // If category already exists on the same date, update the amount
                    result.amount += Expense
                    await result.save()
                    res.status(200).json({ message: "Expense updated successfully" })
                } 
                else 
                {
                    // If no entry exists for this category on the same date, add a new record
                    const newExpense = new Expenses({
                        date:Date,
                        category:Category,
                        amount:Expense
                    })
        
                    await newExpense.save();
                    res.status(201).send("Successfully added new expense");
                }
            }
        
        
            catch (error) {
                console.error("Error:", error);
                res.status(500).send("Internal Server error");
            }
            
        
        
      
})


expensetrack.get('/viewexpense',async(req,res)=>
    {
        try{
            const date1=req.query.dates
    
            const result = await Expenses.find({date:date1})
    
            if(result)
            {
                res.send(result)
                console.log(result)
            }
            else
            {
                res.status(400).send("Expense details not found")
            }
        }
        catch
        {
            res.status(500).send("Internal server error")
        }
    })

export {expensetrack}