import { Router } from "express";
import bcrypt, { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { users } from "../Schemas/schema1.js"
import { movie } from "../Schemas/movies.js"
import { bookmovie } from "../Schemas/booking.js";
import { multiplex } from "../Schemas/multiplex.js";
import { authenticate } from "../Middleware/auth.js";

dotenv.config()

const user=Router()


user.post('/signup',async(req,res)=>
{
    try
    {
        const {Name,Email,Role,Password} =req.body

        const result = await users.findOne({email:Email})
        if(result)
        {
            res.status(400).send("User already exists")
        }
        else
        {
            const newpswd = await bcrypt.hash(Password,10)

            const newuser = new users({
                name:Name,
                email:Email,
                role:Role,
                password:newpswd
            })
            
            await newuser.save()
            res.status(201).send("Successfully signed up")
            
        }
    }
    catch
    {
        res.status(500).send("Internal serevr error")
    }
})

user.post('/login',async(req,res)=>
{
    try
    {
        const {Email,Password} = req.body
        
        const result = await users.findOne({email:Email})

        if(result)
        {
            const compare1 = await bcrypt.compare(Password,result.password)
            if(compare1)
            {
                const token= jwt.sign({Email:Email,Role:result.role},process.env.SECRET_KEY)
                console.log(token)
                res.cookie('userauthtoken',token,{httpOnly:true})
                res.status(200).send("Successfulyy logged in")
            }
            else
            {
                res.status(401).send("Unauthorized access")
            }
        }
        else
        {
            res.status(400).send("Email not registered")
        }
    }
    catch
    {
        res.status(500).send("Internal server error")
    }
})

// user.post('/bookmovie',authenticate,async(req,res)=>
// {
//     try
//     {
//         const {Moviename,SeatCount,Seat} = req.body

//         const data = await users.findOne({email:req.Email})

//         const result = await movie.findOne({moviename:Moviename})
//         if(result)
//         {
//             const result2 = await bookmovie.findOne({moviename:Moviename})
//             if(result2)
//                 {
//                     res.status(400).send("Movie already booked")
//                 } 
//             else
//             {
//                 if(multiplex.seats[Seat]<SeatCount)
//                 {
//                     res.send("Not enough seats")
//                 }

//                 multiplex.seats[Seat]-=SeatCount
//                 await multiplex.save()
                
//                     const newbooking = new bookmovie({
//                         userid:data.email,
//                         moviename:Moviename,
//                         seatcount:SeatCount,
//                         seat:Seat
//                     })
              
                

//                 await newbooking.save()
//                 res.status(200).send("Movie booked successfully")
//             }
//         }
//         else
//         {
//             res.status(400).send("Movie not found")
//         }
//     }
//     catch(error)
//     {
//         console.log(error)
//         res.status(500).send("Internal server error")
//     }
// })

user.post('/bookmovie', authenticate, async (req, res) => {
    try {
        const { Moviename, SeatCount, Seat } = req.body;
        console.log(SeatCount)
        console.log(Seat)

        // Fetch user data
        const data = await users.findOne({ email: req.Email });
        if (!data) return res.status(404).send("User not found");

        // Fetch movie details
        const result = await movie.findOne({ moviename: Moviename });
        if (!result) return res.status(404).send("Movie not found");

        // Get corresponding multiplex for the movie's screen
        const multiplex1 = await multiplex.findOne({ screenNumber: result.screenNumber });
        if (!multiplex1) return res.status(404).send("Multiplex not found");

        // Check if the movie is already booked
        const existingBooking = await bookmovie.findOne({ moviename: Moviename, userid: data.email });
        if (existingBooking) return res.status(400).send("Movie already booked");

        // Validate seat availability
        if (multiplex1.seats[Seat] < SeatCount) {
            return res.status(400).send("Not enough seats available");
        }

        // Update seat availability
        multiplex1.seats[Seat] -= SeatCount;
        await multiplex1.save();

        // Create new booking
        const newbooking = new bookmovie({
            userid: data.email,
            moviename: Moviename,
            seatcount: SeatCount,
            seat: Seat
        });

        await newbooking.save();
        res.status(200).send("Movie booked successfully");
    } catch (error) {
        console.error("Error during booking:", error);
        res.status(500).send("Internal server error");
    }
});



user.get('/logout',(req,res)=>
{
    res.clearCookie('userauthtoken')
    res.status(200).send("Logged out....")
})
export {user}