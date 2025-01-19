import express from 'express'
import { userauth } from './Routes/userauth.js'

const app=express()  //any variable name can be given

//route from another file and using its method
app.use('/',userauth)

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