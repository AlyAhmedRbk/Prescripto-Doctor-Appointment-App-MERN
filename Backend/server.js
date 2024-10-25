import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";


// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// Api end points
app.use("/api/admin", adminRouter)
app.use("/api/doctors", doctorRouter)
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
    res.send("API IS WORKING");
})

app.listen(port, ()=>{
    console.log("APP LISTENING AT PORT : ",port);
})