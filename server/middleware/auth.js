const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

const authMiddleware=(req,res,next)=>{
    const token=req.cookies.token;

    if(!token) return res.status(401).json({error:'Unauthorized'});

    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user=decoded;
        next();
    }catch{
        res.status(401).json({error:'Invalid token'});
    }
};

module.exports=authMiddleware;