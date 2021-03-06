import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pins from './routes/pins.js'
import users from './routes/users.js'
import cors from 'cors'

const app=express();



dotenv.config();
app.use(cors())
app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,  useUnifiedTopology: true, useCreateIndex:true})
.then(()=>{
    console.log("mongo atlas connected!!")
}).catch((e)=>{
    console.log(e)
})
app.get('/',(req, res)=>{
    res.send("hello pin map api")
})
const PORT = process.env.PORT||6900;
app.use('/api/pins',pins);
app.use('/api/users',users);
app.listen(`${PORT}`,() => {
    console.log("running of port 6900")
})
