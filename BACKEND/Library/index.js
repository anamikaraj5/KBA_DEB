import express,{json} from 'express'
import dotenv from 'dotenv'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/adminauth.js'
import cors from 'cors'

const app=express() 

app.use(json())

app.use(cors({origin:'http://127.0.0.1:5500',credentials:true}))
app.use('/',userauth)
app.use('/',adminauth)

const PORT = process.env.PORT 

app.listen(PORT,function(){
    console.log("server is listening at 8000")
})