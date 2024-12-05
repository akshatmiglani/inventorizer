const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User = require('../models/User')
const router=express.Router();
const dotenv=require('dotenv')
dotenv.config()

const JWT_SECRET=process.env.JWT_SECRET;

router.post('/register',async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user=new User({email,password});
        await user.save();
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '3h' });
        res.status(201).json({ message: 'User registered successfully.', token });
    }catch(error){
        res.status(400).json({error: "Invalid request!"})
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });
  
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Invalid email or password' });
  
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '3h' });
    res.json({ token });
  });
  
  module.exports = router;