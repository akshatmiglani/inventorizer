const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db')
const userRoutes=require('./routes/userRoutes')

dotenv.config()
const app=express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user',userRoutes);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})