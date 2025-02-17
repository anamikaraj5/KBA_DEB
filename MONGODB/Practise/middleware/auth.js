import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const authenticate=(req,res,next)=>
{
    const cookies = req.headers.cookie
    if(cookies)
    {
        const [name,token] = cookies.trim().split("=")
        console.log(`Name = ${name}`)
        if(name=='userauthtoken')
        {
            const verified = jwt.verify(token,process.env.SECRET_KEY)
            req.Email = verified.Email
            req.Roles = verified.Roles
            next()
        }
        else
        {
            res.status(401).send("Unauthorized access")
        }
    }
    else
    {
        res.status(400).send("Cookie not found")
    }
}

export {authenticate}