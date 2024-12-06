const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt=require('bcryptjs');

router.post('/login', async (req,res)=>{
    const {email,password}=req.body;

    try{
        const user=User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Incorrect email address"});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1hr'});

        res.json({token});

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;