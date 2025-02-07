import {Schema} from "mongoose"
import {model} from 'mongoose'

const account = new Schema({
    
    fullname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:String,
    password:{type:String,required:true}
})


const details =model('accountdetails',account)

export {details}