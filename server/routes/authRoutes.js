const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv')
dotenv.config()

router.post('/login', async (req,res)=>{
    const {email,password}=req.body;

    try{
        console.log(email);
        console.log("hello");
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Incorrect email address"});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1hr'});

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({ message: 'Login successful',user });

    }catch(err){
        console.error(err.message);
        res.status(500).json({error:err.message});
    }
})

module.exports = router;