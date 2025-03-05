import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { Account } from '../Schema/account.js';
import { User } from '../Schema/userdata.js';

const setbudget = Router();

// SETTING BUDGET
setbudget.post('/setbudget', authenticate, async (req, res) => {
    try {
        const { Category, Limit, Month } = req.body; 

        // Find the user first
        const user = await User.findOne({ email: req.emails });
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Find the associated account based on userEmail
        let account = await Account.findOne({ userEmail: user.email });

        // If account doesn't exist, create a new one
        if (!account) {
            account = new Account({ userEmail: user.email, expenses: [], budgets: [] });
        }

        // Ensure `budgets` array is initialized
        if (!account.budgets) {
            account.budgets = [];
        }

        // Check if the budget already exists for the given category and month
        const existingBudget = account.budgets.find(
            budget => budget.category === Category && budget.month === Month
        );

        if (existingBudget) {
            return res.status(400).send("Budget already added.");
        }

        // Add new budget entry
        account.budgets.push({
            category: Category,
            limit: Limit,
            month: Month
        });

        await account.save(); // Save the updated account document
        res.status(201).send("Successfully added a budget.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error.");
    }
});

export default setbudget;



//VIEW BUDGET

setbudget.get('/viewbudget1', authenticate, async (req, res) => {
    try {
        const  monthname  = req.query.dates

        const account = await Account.findOne({ userEmail: req.emails })

        if (!account) {
            return res.status(404).send("Account not found.");
        }

        // Find all budgets for the given month without using filter
        const Budgetdata = [];
        for (const budget of account.budgets) {
            if (budget.month === monthname) {
                Budgetdata.push(budget);
            }
        }

        if (Budgetdata.length === 0) {
            return res.status(404).send("Budget details not found.");
        }

        let Totalbudget = 0, Totalspent = 0, Totalbalance = 0;
        let Categorydata = [];

        // Calculate total budget and spent amount for each category
        for (const budget of Budgetdata) {
            let spent = 0;
            for (const exp of account.expenses) {
                if (exp.category === budget.category && exp.date.slice(0,7) === monthname) {
                    spent += exp.amount;
                }
            }

            Totalbudget += budget.limit;
            Totalspent += spent;

            Categorydata.push({
                category: budget.category,
                budget: budget.limit,
                month:budget.month,
                spent: spent,
                remaining: budget.limit - spent,
                message: spent >= budget.limit ? "Budget limit reached!" : ""
            });
        }

        Totalbalance = Totalbudget - Totalspent;

        res.status(200).json({
            total_budget: Totalbudget,
            total_spent: Totalspent,
            total_balance: Totalbalance,
            categories: Categorydata
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error.");
    }
});



// UPDATE BUDGET
setbudget.put('/updatebudget', authenticate, async (req, res) => {
    try {
        const { Category, Limit, Month } = req.body;

        const account = await Account.findOne({ userEmail: req.emails });

        if (!account) {
            return res.status(404).send("Account not found.");
        }

        const budget = account.budgets.find(budget => budget.category === Category && budget.month === Month);

        if (!budget) {
            return res.status(404).send("Budget details not found.");
        }

        // Update budget details
        budget.limit = Limit;

        await account.save();
        res.status(200).send("Budget updated successfully.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error.");
    }
});


//DELETE BUDGET

setbudget.delete('/deletebudget', authenticate, async (req, res) => {
    try {
        const { Category, Month } = req.body;

        const account = await Account.findOne({ userEmail: req.emails });

        if (!account) {
            return res.status(404).send("Account not found.");
        }

        // Find index of the budget to delete
        const budgetIndex = account.budgets.findIndex(budget => budget.category === Category && budget.month === Month);

        if (budgetIndex === -1) {
            return res.status(404).send("Budget details not found.");
        }

        // Remove the budget entry at the found index
        account.budgets.splice(budgetIndex, 1);

        await account.save();
        res.status(200).send("Budget deleted successfully.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error.");
    }
});


export{setbudget}