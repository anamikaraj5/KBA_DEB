import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {  Account } from '../Schema/account.js'; // Updated import
import { User } from '../Schema/userdata.js';


const expensetrack = new Router()

// ADDING EXPENSE
expensetrack.post('/addexpense', authenticate, async (req, res) => {
    try {
        const { Category, Expense, Date } = req.body;

        console.log(req.emails)
        // Find the account associated with the authenticated user's email
        const account = await Account.findOne({ userEmail: req.emails });

        if (!account) {
            return res.status(404).send("Account not found for the user.");
        }

        // Check if the expense already exists for the given date and category
        const existingExpense = account.expenses.find(exp => exp.date === Date && exp.category === Category);

        if (existingExpense) {
            return res.status(200).send("Expense details already added!");
        }

        // Add the new expense to the account
        account.expenses.push({
            category: Category,
            amount: Expense,
            date: Date
        });

        await account.save();
        res.status(201).send("Successfully added new expense.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// VIEW EXPENSES FOR A SPECIFIC MONTH
expensetrack.get('/viewexpense', authenticate, async (req, res) => {
    try {
        const month = req.query.dates; // Expected format: MM-YYYY

        // Find the user's account and fetch only the expenses that match the given month
        const account = await Account.findOne(
            { userEmail: req.emails, "expenses.date": { $regex: month } }
        );

        if (!account || account.expenses.length === 0) {
            return res.status(404).json({ message: "No expense details found for the given month." });
        }

        let TotalExpense = 0;
        let TotalIncome = 0;

        account.expenses.forEach(entry => {
            if (entry.category.toLowerCase() === 'salary') {
                TotalIncome += entry.amount;
            } else {
                TotalExpense += entry.amount;
            }
        });

        res.status(200).json({
            expenses: account.expenses,
            TotalExpense,
            TotalIncome
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

    


// UPDATING EXPENSE
expensetrack.put('/updateexpense', authenticate, async (req, res) => {
    try {
        const { Category, Expense, Date } = req.body;

        // Find the account associated with the authenticated user's email
        const account = await Account.findOne({ userEmail: req.emails });

        if (!account) {
            return res.status(404).send("Account not found for the user.");
        }

        // Find the expense to update
        const expense = account.expenses.find(exp => exp.date === Date && exp.category === Category);

        if (!expense) {
            return res.status(400).send("Expense details not found.");
        }

        // Update the expense details
        expense.amount = Expense;

        await account.save();
        res.status(200).send("Expense updated successfully.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});




// DELETING EXPENSE
expensetrack.delete('/deleteexpense', authenticate, async (req, res) => {
    try {
        const { Category, Date } = req.body;

        // Find the account associated with the authenticated user's email
        const account = await Account.findOne({ userEmail: req.emails });

        if (!account) {
            return res.status(404).send("Account not found for the user.");
        }

        // Find the index of the expense to delete
        const expenseIndex = account.expenses.findIndex(exp => exp.date === Date && exp.category === Category);

        if (expenseIndex === -1) {
            return res.status(404).send("Expense details not found.");
        }

        // Remove the expense from the array
        account.expenses.splice(expenseIndex, 1);

        await account.save();
        res.status(200).send("Expense deleted successfully.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});



export {expensetrack}