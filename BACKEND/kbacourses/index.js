import express,{json} from 'express'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/addcourse.js'

const app=express()  //any variable name can be given

//to make the json stringify to json format
app.use(json())

//route from another file and using its method
app.use('/',userauth)
app.use('/',adminauth)

//route when a particular route is not specified
app.get('/',function(req,res){
    res.send("Hello Everyone")
})

//cannot test using browser
app.post('/',function(req,res){
    res.send("Hello Everyone")
})

app.listen(8000,function(){
    console.log("server is listening at 8000")
})

