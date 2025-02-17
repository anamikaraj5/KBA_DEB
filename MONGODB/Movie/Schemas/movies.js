import { Schema } from "mongoose"
import { model } from "mongoose"

const demo3 = new Schema({
    moviename:{type:String},
    shows_no:{type:Number},
    language:{type:String},
    startdate:{type:String},
    enddate:{type:String},
    screen_no:{type:Number,required:true},
})

const movie = model('movie',demo3)

export {movie}