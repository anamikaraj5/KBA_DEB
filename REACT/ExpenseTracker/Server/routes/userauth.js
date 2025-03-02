// In your router file
import { Router } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../Schema/userdata.js'; // Updated import
import { authenticate } from '../middleware/authenticate.js';

const userauth = Router();
dotenv.config();

// SIGNUP
userauth.post('/signup', async (req, res) => {
    try {
        const { FullName, Email, Phone, Password } = req.body;

        const existingUser = await User.findOne({ email: Email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new User({
            fullname: FullName,
            email: Email,
            phone: Phone,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send("Successfully Registered");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


// LOGIN
userauth.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await User.findOne({ email: Email });
        if (!user) {
            return res.status(400).send("Email not registered");
        }

        const isValidPassword = await bcrypt.compare(Password, user.password);
        if (!isValidPassword) {
            return res.status(401).send("Unauthorized access");
        }

        const token = jwt.sign({ Email: user.email ,FullName:user.fullname}, process.env.SECRET_KEY, { expiresIn: '7h' });
        res.cookie('userauthtoken', token, { httpOnly: true });
        res.status(200).send("Successfully logged in");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


// VIEW PROFILE
userauth.get('/viewprofile', authenticate, async (req, res) => {
    try {
        const email = req.query.emailid;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send("User not found");
        }

        res.json({
            fullname: user.fullname,
            email: user.email,
            phone: user.phone
        });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


userauth.get('/profile',authenticate,(req,res)=>{
    res.status(200).json({fullname:req.name})
});

// LOGOUT
userauth.get('/logout', (req, res) => {
    res.clearCookie("userauthtoken");
    res.status(200).send("Logging out");
});


export { userauth };