import {Schema} from "mongoose"
import {model} from 'mongoose'

const demo2 = new Schema({

    bookname:{type:String,required:true},
    bookid:{type:String,required:true},
    genre:{type:String,required:true},
    author:{type:String,required:true},
    dates:{type:String,required:true},
    description:{type:String,required:true}
})


const books=model('booksdetails',demo2)

export {books}