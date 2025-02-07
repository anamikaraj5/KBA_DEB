import {Router} from 'express'
import {authenticate} from '../middleware/authenticate.js'
import { Expenses } from '../Schema/expenses.js'

const expensetrack = new Router()

//ADDING EXPENSE

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


    expensetrack.get('/viewrecords', async (req, res) => {
        try {
            const { month } = req.query;
            if (!month) {
                return res.status(400).send("Month query parameter is required");
            }
    
            const allExpenses = await Expenses.find({});
            const result = allExpenses.filter(expense => expense.date.slice(0, 7) === month);
    
            if (!result.length) {
                return res.status(404).send("No expense details found for the given month");
            }
    
            let totalExpense = 0;
            let totalIncome = 0;
    
            result.forEach(entry => {
                if (entry.category.toLowerCase() === 'salary') {
                    totalIncome += entry.amount;
                } else {
                    totalExpense += entry.amount;
                }
            });
    
            res.status(200).json({
                expenses: result,
                totalExpense,
                totalIncome
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal server error");
        }
    });

//total records page
    expensetrack.get('/viewexpense2', async (req, res) => {
        try {
            const month = req.query.dates
         
            const allExpenses = await Expenses.find({});
            const result = [];
    
            for (const expense of allExpenses) {
                if (expense.date.slice(3, 10) === month) {
                    result.push(expense);
                }
            }
    
            if (result.length === 0) {
                return res.status(404).send("No expense details found for the given month");
            }
    
            let totalExpense = 0;
            let totalIncome = 0;
    
            result.forEach(entry => {
                if (entry.category.toLowerCase() === 'salary') {
                    totalIncome += entry.amount;
                } else {
                    totalExpense += entry.amount;
                }
            });
    
            res.status(200).json({
                expenses: result,
                totalExpense,
                totalIncome
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal server error");
        }
    });
    


//UPDATING EXPENSE

expensetrack.put('/updateexpense',authenticate,async(req,res)=>
{
    
        const {Category,Expense,Date} = req.body
        
        const result = await Expenses.findOne({category:Category})
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
                res.status(400).send("Category details not found")
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