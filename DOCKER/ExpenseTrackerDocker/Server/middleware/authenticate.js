import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authenticate=(req,res,next)=>
{
    const cookies = req.headers.cookie
    console.log(cookies)

    if (cookies)
    {

        const [name,token] = cookies.trim().split("=")
        console.log("Token Name : ",name)
        console.log("Token Value : ",token)
        if(name == "userauthtoken")
        {
            const verified = jwt.verify(token,process.env.SECRET_KEY)
            console.log(verified)
            req.emails=verified.Email
            req.name=verified.FullName
            next()
        }
        else
        {
            res.status(401).send("Unauthorized access")
        }

    }
    
    else
    {
        res.status(400).send("No cookie available")
    }
}

export {authenticate}