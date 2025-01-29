import express,{json} from 'express'
import dotenv from 'dotenv'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/addbook.js'

const app=express() 

app.use(json())

app.use('/',userauth)
app.use('/',adminauth)

const PORT = process.env.PORT 

app.listen(PORT,function(){
    console.log("server is listening at 8000")
})