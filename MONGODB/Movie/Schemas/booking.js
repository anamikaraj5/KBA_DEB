import { Schema } from "mongoose"
import { model } from "mongoose"

const demo4 = new Schema({
    userid:{type:String,ref:"users"},
    moviename:{type:String},
    seatcount:{type:Number},
    seat:{type:String}
})

const bookmovie = model('bookmovie',demo4)

export {bookmovie}