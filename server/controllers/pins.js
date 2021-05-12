import mongoose from 'mongoose';
import pin from '../models/pins.js';

export const postPins= async (req, res)=>{
    const newPin= new pin(req.body);
    try {
        const savedPin= await newPin.save();
        res.status(200).json(savedPin);
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }

}

export const getPins= async(req,res)=>{
    try {
        const getPins= await pin.find()
        res.status(200).json(getPins);
        
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }

}