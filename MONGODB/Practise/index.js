import express,{json} from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {userauth} from './Routes/User.js'
import { adminauth } from './Routes/Admin.js'

dotenv.config

const app=express()

app.use(json())

app.use('/',userauth)
app.use('/',adminauth)

mongoose.connect('mongodb://localhost:27017/practise').then(()=>
    {
        console.log("Connected to practise")
    })
    .catch((error) =>
    {
        console.log("Error",error)
    })

const PORT=process.env.PORT
app.listen(PORT,function()
{
    console.log(`Server listening at ${PORT}`)
})