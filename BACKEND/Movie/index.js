import express,{json} from 'express'
import {user} from './Routes/user.js'
import {admin} from './Routes/admin.js'
import dotenv from 'dotenv'

dotenv.config()

const app=express()

app.use(json())

app.use('/',user)
app.use('/',admin)

const PORT= process.env.PORT

app.listen(PORT,function()
{
    console.log(`Server is listening at ${PORT}`)
})