import express,{json} from 'express'
import dotenv from 'dotenv'
import {userauth} from './routes/userauth.js'

dotenv.config()

const app = express()

app.use(json())

app.use('/',userauth)

const PORT=process.env.PORT
app.listen(PORT,function()
{
    console.log(`Server is listening at port ${PORT}`)
})