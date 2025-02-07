import {Schema} from "mongoose"
import {model} from 'mongoose'

const track  = new Schema({
    
    category:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:String,required:true}
})


const Expenses =model('expensedetails',track)

export {Expenses}