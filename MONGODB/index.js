import express,{json}  from 'express'
import mongoose from 'mongoose'
import { router } from './route1.js'

const app = express()

app.use(json())
app.use('/',router)

const PORT=4000
app.listen(PORT,function()
{
    console.log(`Server is listening at ${PORT}`)
})

//connecting to database
mongoose.connect('mongodb://localhost:27017/Demo')