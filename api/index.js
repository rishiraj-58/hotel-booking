import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

// Set up CORS options
const corsOptions = {
    origin: 'https://rrbookings.onrender.com',
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  };
  
  
  // Enable CORS
  app.use(cors(corsOptions));

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
})

//middlewares
app.use(cookieParser())
app.use(express.json()) // It will make it in json format, so api request can be understood

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend.")
})