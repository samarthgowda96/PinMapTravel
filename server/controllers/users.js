import bcrypt from 'bcrypt'
import user from '../models/users.js';

export const register = async (req, res)=>{
    //const newUser= req.params;
    try {
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt)
        const newUser= new user({ 
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        const savedUser = await newUser.save();
        res.status(200).json(savedUser._id)
        
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

