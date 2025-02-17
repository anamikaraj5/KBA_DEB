import express,{json} from 'express'
import {user} from './Routes/user.js'
import {admin} from './Routes/admin.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app=express()

app.use(json())

app.use('/',user)
app.use('/',admin)

mongoose.connect('mongodb://localhost/Movie').then(()=>
{
    console.log("Connected to Movie database")
})
.catch((error)=>
{
    console.log(error)
})

const PORT= process.env.PORT

app.listen(PORT,function()
{
    console.log(`Server is listening at ${PORT}`)
})