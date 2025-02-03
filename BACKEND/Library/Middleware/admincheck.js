const admincheck=(req,res,next)=>
{
    if(req.Role == 'admin')
    {
        next()
    }
    else
    {
        res.status(401).send("Unauthorized access")
    }
}

export {admincheck}