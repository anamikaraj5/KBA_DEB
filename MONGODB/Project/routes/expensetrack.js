import {Router} from 'express'
import {authenticate} from '../middleware/authenticate.js'
import { Expenses } from '../Schema/expenses.js'

const expensetrack = new Router()

//ADDING EXPENSE

expensetrack.post('/addexpense',authenticate,async(req,res)=>
    {
        try{
                const {Category,Expense,Date} = req.body
           
                const result = await Expenses.findOne({date:Date,category:Category }) 
    
                if (result)
                {
                    res.status(200).send("Expense details already added!!!!!")
                } 
                else 
                {
                    const newExpense = new Expenses({
                        date:Date,
                        category:Category,
                        amount:Expense
                    })
        
                    await newExpense.save();
                    console.log(newExpense)
                    res.status(201).send("Successfully added new expense");
                }
            }
        
        
            catch (error) {
                console.error("Error:", error);
                res.status(500).send("Internal Server error");
            }
            
})


//VIEW EXPENSE

// expensetrack.get('/viewexpense',async(req,res)=>
//     {
//         try{
//             const date1=req.query.dates
    
//             const result = await Expenses.find({date:date1})
    
//             if(result)
//             {
//                 res.send(result)
//                 console.log(result)
//             }
//             else
//             {
//                 res.status(400).send("Expense details not found")
//             }
//         }
//         catch
//         {
//             res.status(500).send("Internal server error")
//         }
//     })



//total records page
expensetrack.get('/viewexpense2', async(req,res) => 
    {
        try{

            const month = req.query.dates  //(MM-YYYY)
         
            const Allexpenses = await Expenses.find()
            const result = []
            let TotalExpense = 0
            let TotalIncome = 0
    
            for(const expense of Allexpenses) 
            {
                if(expense.date.slice(3, 10) === month) 
                {
                    result.push(expense)
                }
            }
    
            if(result.length==0) 
            {
                 res.status(404).json({message: "No expense details found for the given month"})
            }
    
            else
            {
                result.forEach(entry => 
                    {
                        if(entry.category.toLowerCase() === 'salary') 
                        {
                            TotalIncome += entry.amount
                        } 
                        else 
                        {
                            TotalExpense += entry.amount
                        }
                    })
            
                    res.status(200).json({
                        expenses: result,
                        TotalExpense,
                        TotalIncome
                    })
            }
    
            
        } 
        catch(error) 
        {
            console.error("Error:", error)
            res.status(500).send("Internal server error")
        }
    })
    


//UPDATING EXPENSE

expensetrack.put('/updateexpense',authenticate,async(req,res)=>
{
    
        const {Category,Expense,Date} = req.body
        
        const result = await Expenses.findOne({category:Category,date:Date})
        if(result)
            {
                result.category=Category,
                result.amount=Expense,
                result.date=Date

                await result.save()
                console.log(result)
                res.status(200).send("Expense Updated successfully...")
            }
        else
            {
                res.status(400).send("Expense details not found")
            }
    
})



//DELETING EXPENSE

expensetrack.delete('/deleteexpense', authenticate, async(req,res) => {
    try {
        const { Category, Date } = req.body

        const result = await Expenses.findOne({category:Category,date:Date})

        if(result) 
        {
            await Expenses.findOneAndDelete({category:Category,date:Date})
            res.status(200).send("Expense Deleted.....");
        } 
        else 
        {
            res.status(404).send("Expense details not found");
        }
    } 
    catch(error) {
        res.status(500).send("Internal Server Error",error);
    }
})


export {expensetrack}