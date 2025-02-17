import { Schema } from "mongoose"
import { model } from "mongoose"

const demo = new Schema({
    student_name:{type:String,required:true},
    enrollment_no:{type:String,required:true,unique:true},
    course:{type:String,required:true},
    date:{type:String,required:true}
})

const student = model('student',demo)

export{student}