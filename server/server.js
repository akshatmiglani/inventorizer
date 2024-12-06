const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db')
const registerRoute=require('./routes/registerRoutes')
const authRoute=require('./routes/authRoutes')

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

app.use("/api/v1/registrationRoutes", registerRoute);
app.use("/api/v1/authRoutes", authRoute);

app.get("/", (req, res) => {
  console.log("Its Working");
});


const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
