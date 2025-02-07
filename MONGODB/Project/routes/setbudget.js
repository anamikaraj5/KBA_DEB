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
    
            const result = await budgets.findOne({month:month})
    
            if(result)
            {
                res.send(result)
                console.log(result)
               
            }
            else
            {
                res.status(400).send("Budget not found for the given month")
            }
        }
        catch
        {
            res.status(500).send("Internal server error")
        }
    })


setbudget.get('/viewbudget',async(req,res)=>
{
    try{
        const cat=req.query.month

        const data = await Expenses.find({category:cat})
        console.log(data);
        
        const result = await budgets.findOne({category:cat})

        if(result)
        {
            if(data.length>0)
            {
                console.log(data)
                let spent = 0;
                data.forEach(expense => {
                    spent += expense.amount;
                })

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



//budgets page

setbudget.get('/viewbudget2', async (req, res) => {
    try {
        const month = req.query.dates
     
        const data = await Expenses.find({date:month})
        const AllBudgets = await budgets.find({});
        const result = [];

        for (const budget of AllBudgets) {
            if (budget.date.slice(3, 10) === month) {
                result.push(budget);
            }
        }

        if (result.length === 0) {
            return res.status(404).send("No budget details found for the given month");
        }

        let totalSpent = 0;
expenses.forEach(expense => {
    if (expense.category !== "Salary") {
        totalSpent += expense.amount;
    }
});

let totalBudget = 0;
let formattedBudgets = [];

result.forEach(entry => {
    if (entry.category !== "Salary") {
        totalBudget += entry.limit;
    }

    formattedBudgets.push({
        category: entry.category,
        budget: entry.limit,
        spent: totalSpent,
        remaining: entry.limit - totalSpent
    });
});

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
});



//UPDATE BUDGET

setbudget.put('/updatebudget',authenticate,async(req,res)=>
    {
        
            const {Category,Limit,Month} = req.body
            
            const result = await Expenses.findOne({category:Category})
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
                    res.status(400).send("Budget details not found")
                }
        
    })

export{setbudget}