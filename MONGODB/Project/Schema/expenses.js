import {Schema} from "mongoose"
import {model} from 'mongoose'

const track  = new Schema({
    
    userid:{type:Schema.Types.ObjectId,ref:'accountdetails'},
    category:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:String,required:true}
})


const Expenses =model('expensedetails',track)

export {Expenses}