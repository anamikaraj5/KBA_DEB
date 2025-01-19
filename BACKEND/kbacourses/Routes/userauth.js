//importing route fn from express
import {Router} from 'express'

const userauth=Router()

userauth.get('/',(req,res)=>{
    res.send("Hiii Everyone")
})

export {userauth}