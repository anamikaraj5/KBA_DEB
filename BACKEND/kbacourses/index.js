import express,{json} from 'express'
import { userauth } from './Routes/userauth.js'
import { adminauth } from './Routes/addcourse.js'
// import { adminsign } from './Routes/adminsignup.js'
import cors from 'cors'


const app=express()  //any variable name can be given

// app.use(cors({origin:'127.0.0.1:5500',credentials:true})) 
// app.use(function(req, res, next) {
//         res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//         res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//         res.header("Access-Control-Allow-Credentials","true");
//         next();
//       });
//to make the json stringify to json format
app.use(json())

app.use(cors({origin:'http://127.0.0.1:5500',credentials:true})) 

//route from another file and using its method

app.use('/',userauth)
app.use('/',adminauth)

// app.use('/admin',adminsign)
// app.use('/',userauth)
// app.use('/api',adminauth)

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
