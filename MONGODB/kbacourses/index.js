import express,{json} from 'express'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/addcourse.js'
import mongoose from 'mongoose'

const app=express() 

app.use(json())


app.use('/',userauth)
app.use('/',adminauth)

//connecting databases

mongoose.connect('mongodb://localhost:27017/kbacourses').then(()=>
    {
        console.log("MongoBD connected successfully to kbacourse")
    })
    .catch((error)=>
    {
        console.error("Mongodb connection failed",error)
    })

app.listen(8000,function(){
    console.log("server is listening at 8000")
})
