import express,{json} from 'express'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/issuecerti.js'

const app=express() 

app.use(json())

app.use('/',userauth)
app.use('/',adminauth)


app.listen(9000,function(){
    console.log("server is listening at 8000")
})