import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pins from './routes/pins.js'
import users from './routes/users.js'

const app=express();



dotenv.config();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,  useUnifiedTopology: true, useCreateIndex:true})
.then(()=>{
    console.log("mongo atlas connected!!")
}).catch((e)=>{
    console.log(e)
})

app.use('/api/pins',pins);
app.use('/api/users',users);
app.listen(6900,() => {
    console.log("running of port 6900")
})
