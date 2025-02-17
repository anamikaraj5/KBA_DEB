import { Schema } from "mongoose"
import { model } from "mongoose"

const demo2 = new Schema(
    {
        coursename:{type:String,required:true},
        courseid:{type:String,required:true},
        description:String,
        price:String,
        image:String
    }
)

const courses = model('courses',demo2)

export {courses}