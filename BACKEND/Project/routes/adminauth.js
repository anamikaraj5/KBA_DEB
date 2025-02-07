import dotenv from'dotenv'
import {Router} from 'express'

const adminauth = Router()
const expenses = new Map()

adminauth.post('/addexpense',(req,res)=>
{
    try{
        const {Category,Expense,Date}=req.body

        
    }
})