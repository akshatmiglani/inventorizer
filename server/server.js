const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db')
const registerRoute=require('./routes/registerRoutes')
const authRoute=require('./routes/authRoutes')
const userRoute=require('./routes/userRoutes')
const businessRoute=require('./routes/businessRoutes')
const path=require('path')
const cookieParser = require('cookie-parser');
dotenv.config()
const app=express();

connectDB();

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/v1/registrationRoutes", registerRoute);
app.use("/api/v1/authRoutes", authRoute);
app.use("/api/v1/userRoutes", userRoute);
app.use("/api/v1/businessRoutes", businessRoute);

app.get("/", (req, res) => {
  console.log("Its Working");
});


const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
