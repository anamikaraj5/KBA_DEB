import {Router} from 'express'
import {sample} from './models/user.js'

const router=Router()
router.post('/create',async(req,res)=>
{
    try{
        const data = req.body

        //
        const result = await sample.create(data)
        res.status(201).json(result);
        console.log(result)       
    }
    catch
    {
        console.log(error)
        res.status(500).send("External server error")
    }
})

router.get('/read',async(req,res)=>
{
    try{
        // const result = await sample.find()
        const result = await sample.findById('67a320a27d9aa0e3bf5e2100')
        res.status(200).send(result)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("External server error")
    }
})

export {router}