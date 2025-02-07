import {Schema} from "mongoose"
import {model} from 'mongoose'
const demo = new Schema({
    userid:{type:String,required:true},
    name:{type:String,required:true},
    dob:{type:String,required:true}
})

//sample1 - collection , using the schema (demo) the model is structured
const sample=model('sample1',demo)

export {sample}