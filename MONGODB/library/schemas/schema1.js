import {Schema} from "mongoose"
import {model} from 'mongoose'

const demo1 = new Schema({

    name:{type:String,required:true},
    roles:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})


const users=model('userdetails',demo1)

export {users}