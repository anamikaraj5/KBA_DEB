import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { route1 } from './routes.js'
import cors from 'cors'

dotenv.config()

const app=express()

app.use(json())


app.use(cors({
    origin:'*',
    credentials:true
}))


app.use('/',route1)

mongoose.connect('mongodb://localhost:27017/StudentEnrollmentSystem1').then(()=>
{
    console.log('Connected to database StudentEnrollmentSystem')
})
.catch((error)=>
{
    console.log(error)
})

const PORT = process.env.PORT

app.listen(PORT,function()
{
    console.log(`Server is listening at ${PORT}`)
})