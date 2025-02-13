import {Router} from 'express'
import {authenticate} from '../middleware/authenticate.js'
import { budgets } from '../Schema/budgets.js'
import { Expenses } from '../Schema/expenses.js'

const setbudget=Router()


//SETTING BUDGET 

setbudget.post('/setbudget',authenticate,async(req,res)=>
    {
        try{
    
                const {Category,Limit,Month} = req.body    //Month- mm-yyyy
           
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

// setbudget.get('/viewbudget',async(req,res)=>
//     {
//         try{
//             const month=req.query.monthname
    
//             const result = await budgets.find({month:month})
    
//             if(result)
//             {
//                 res.send(result)
//                 console.log(result)
               
//             }
//             else
//             {
//                 res.status(400).send("Budget not found for the given month!!!!!")
//             }
//         }
//         catch
//         {
//             res.status(500).send("Internal server error")
//         }
//     })



setbudget.get('/viewbudget1', async (req, res) => 
    {
        try {
            const month = req.query.monthname
    
            const Budgetdata = await budgets.find({ month })
    
            if (!Budgetdata) 
            {
                return res.status(400).send("Budget details not found!!!")
            }
    

            // inorder to send spent on each budget (we have to get details from expense collection)
            const Allexpenses = await Expenses.find()
            const Expensedata = []
            for (let exp of Allexpenses) 
            {
                if (exp.date.slice(3)  === month) 
                {
                    Expensedata.push(exp)
                }
            }
    
            let spent = 0
            let Totalspent = 0
            let Totalbudget = 0
            let Totalbalance = 0
            let Categorydata = []
    
            // inorder to find limit, spent and remaining for each budget
            for (const budget of Budgetdata) 
            {
                Totalbudget += budget.limit 

                for (const exp of Expensedata)
                {
                    if (exp.category === budget.category) 
                    {
                        spent += exp.amount
                    }
                }
    
                Totalspent += spent 
    
                // Push category-wise budget details(as array of objects)
                Categorydata.push({
                    category: budget.category,
                    budget: budget.limit,
                    spent: spent,
                    remaining: budget.limit - spent,
                    message:spent >= budget.limit ? "Budget limit reached!!!!" : ""
                })
            }
    
            Totalbalance = Totalbudget - Totalspent
    
            // Senidng final response
            res.status(200).json({
                total_budget: Totalbudget,
                total_spent: Totalspent,
                total_balance: Totalbalance,
                categories: Categorydata
            })
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