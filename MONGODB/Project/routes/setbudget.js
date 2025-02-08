import {Router} from 'express'
import {authenticate} from '../middleware/authenticate.js'
import { budgets } from '../Schema/budgets.js'
import { Expenses } from '../Schema/expenses.js'

const setbudget=Router()


//SETTING BUDGET 

setbudget.post('/setbudget',authenticate,async(req,res)=>
    {
        try{
    
                const {Category,Limit,Month} = req.body
           
                const result = await budgets.findOne({category:Category,month:Month})  
    
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
                        console.log(newbudget)
                        res.status(201).send("Successful added a budget.....")
              
                    }
            }
        
        
        catch
        {
            res.status(500).send("Internal Server error")
        }
          
})



//VIEW BUDGET

setbudget.get('/viewbudget',async(req,res)=>
    {
        try{
            const month=req.query.monthname
    
            const result = await budgets.find({month:month})
    
            if(result)
            {
                res.send(result)
                console.log(result)
               
            }
            else
            {
                res.status(400).send("Budget not found for the given month!!!!!")
            }
        }
        catch
        {
            res.status(500).send("Internal server error")
        }
    })



setbudget.get('/viewbudget1', async (req, res) => 
    {
        try {
            const month = req.query.monthname
    
            const Budgetdata = await budgets.find({ month })
    
            if (Budgetdata.length === 0) 
            {
                return res.status(400).send("Budget details not found!!!")
            }
    
            // Fetch all expenses and extract only those matching the given month
            const Allexpenses = await Expenses.find()
            const Expensedata = []
            for (let exp of Allexpenses) 
            {
                const expmonth = exp.date.slice(3) 
                if (expmonth === month) 
                {
                    Expensedata.push(exp)
                }
            }
    
            let Totalspent = 0
            let Totalbudget = 0
            let Categorydata = []
    
            // Loop through each budget entry
            for (const budget of Budgetdata) 
            {
                Totalbudget += budget.limit // Sum up total budget for the month
    
                let spent = 0
                for (const exp of Expensedata)
                {
                    if (exp.category === budget.category) 
                    {
                        spent += exp.amount
                    }
                }
    
                Totalspent += spent // Sum up total spent for the month
    
                // Push category-wise details
                Categorydata.push({
                    category: budget.category,
                    budget: budget.limit,
                    spent: spent,
                    remaining: budget.limit - spent,
                    message:spent >= budget.limit ? "Budget limit reached!!!!" : ""
                })
            }
    
            let Totalbalance = Totalbudget - Totalspent
    
            // Prepare final response
            const response = {
                total_budget: Totalbudget,
                total_spent: Totalspent,
                total_balance: Totalbalance,
                categories: Categorydata
            }
    
            res.status(200).json(response)
        } 
        catch (error) 
        {
            console.error(error)
            res.status(500).send("Internal server error")
        }
    })
    
    



//UPDATE BUDGET

setbudget.put('/updatebudget',authenticate,async(req,res)=>
    {
        
            const {Category,Limit,Month} = req.body
            
            const result = await budgets.findOne({category:Category,month:Month})
            if(result)
                {
                    result.category=Category,
                    result.limit=Limit,
                    result.month=Month
    
                    await result.save()
                    console.log(result)
                    res.status(200).send("Budget Updated successfully...")
                }
            else
                {
                    res.status(400).send("Budget details not found!!!!!")
                }
        
    })


//DELETE BUDGET

setbudget.delete('/deletebudget', authenticate, async(req,res) => {
    try {
        const { Category, Month } = req.body

        const result = await budgets.findOne({category:Category,month:Month})

        if(result) 
        {
            await budgets.findOneAndDelete({category:Category,date:Date})
            res.status(200).send("Budget Deleted.....");
        } 
        else 
        {
            res.status(404).send("Budget details not found!!!!!");
        }
    } 
    catch(error) {
        res.status(500).send("Internal Server Error",error);
    }
})

export{setbudget}