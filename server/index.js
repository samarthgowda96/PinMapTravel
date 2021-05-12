import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app=express();

dotenv.config();
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,  useUnifiedTopology: true })
.then(()=>{
    console.log("mongo atlas connected!!")
}).catch((e)=>{
    console.log(e)
})
app.listen(6900,() => {
    console.log("running of port 6900")
})
