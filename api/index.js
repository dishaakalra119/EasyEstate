import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{console.log("Conected to database successfully")}).catch((err)=>{console.log(err)});
const app=express();

app.listen(3000,()=>{
    console.log("Listening at port 3000!!!");
})

app.use('/api/user', userRouter)
// app.get('/',(req,res)=>{res.json({message:"Hello World"},)});