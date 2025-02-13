import express,{json} from 'express'
import dotenv from 'dotenv'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/adminauth.js'
import mongoose from 'mongoose'

dotenv.config()
const app=express() 

app.use(json())

app.use('/',userauth)
app.use('/',adminauth)

const PORT = process.env.PORT 

mongoose.connect('mongodb://localhost:27017/library').then(()=>
    {
        console.log("MongoBD connected successfully to Library")
    })
    .catch((error)=>
    {
        console.error("Mongodb connection failed",error)
    })

app.listen(PORT,function(){
    console.log("server is listening at 8000")
})