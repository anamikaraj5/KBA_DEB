import express,{json} from 'express'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/issuecerti.js'
import cors from 'cors'

const app=express() 

app.use(json())

app.use(cors({origin:'http://127.0.0.1:5502',credentials:true}))
app.use('/',userauth)
app.use('/',adminauth)


app.listen(9000,function(){
    console.log("server is listening at 8000")
})