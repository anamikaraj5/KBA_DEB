import {Schema} from "mongoose"
import {model} from 'mongoose'

const sett  = new Schema({
    
    category:{type:String,required:true},
    limit:{type:Number,required:true},
    month:String
})


const budgets =model('budgetdetails',sett)

export {budgets}