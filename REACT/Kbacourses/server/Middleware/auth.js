import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authenticate=(req,res,next)=>
{
    //inorder to get token, we know that along with req, cookies also come 
    const cookies = req.headers.cookie
    console.log(cookies)

    if (cookies)
    {

    //we have to get the token name and token value separate
    const [name,token] = cookies.trim().split("=")
    console.log("Token Name : ",name)
    console.log("Token Value : ",token)
    if(name == "userauthtoken")
    {
        //check whether token is valid (login cheytha same aal ano ithilk req ayakkunath - only this checking is done)
        const verified = jwt.verify(token,process.env.SECRET_KEY)
        console.log(verified)
        req.Email=verified.Email
        req.Roles=verified.Roles

        //if there is any other functions to do and if next it not there the execution will stop here
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