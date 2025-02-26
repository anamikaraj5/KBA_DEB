import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { Account } from '../Schema/account.js';

const setbudget = Router();

// SETTING BUDGET
setbudget.post('/setbudget', authenticate, async (req, res) => {
    try {
        const { Category, Limit, Month } = req.body; // Month format: MM-YYYY

        const account = await Account.findOne({ userEmail: req.emails });

        if (!account) {
            return res.status(404).send("Account not found for the user.");
        }

        // Check if budget already exists
        const existingBudget = account.budgets.find(budget => budget.category === Category && budget.month === Month);

        if (existingBudget) {
            return res.status(400).send("Budget already added.");
        }

        // Add new budget entry
        account.budgets.push({
            category: Category,
            limit: Limit,
            month: Month
        });

        await account.save();
        res.status(201).send("Successfully added a budget.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error.");
    }
});


//VIEW BUDGET

setbudget.get('/viewbudget', authenticate, async (req, res) => {
    try {
        const { monthname } = req.query;

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
                if (exp.category === budget.category && exp.date.slice(3) === monthname) {
                    spent += exp.amount;
                }
            }

            Totalbudget += budget.limit;
            Totalspent += spent;

            Categorydata.push({
                category: budget.category,
                budget: budget.limit,
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