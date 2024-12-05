const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database.")
    }catch(error){
        console.error("Error occured:", error);
    }
}

module.exports=connectDB;