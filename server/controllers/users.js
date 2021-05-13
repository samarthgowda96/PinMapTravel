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

export const login = async (req, res)=>{
    try {
            const loginUser= await user.findOne({username:req.body.username})
            !loginUser && res.status(400).json("wrong username or password")

            const validPassword= await bcrypt.compare(req.body.password,loginUser.password)
            !validPassword && res.status(400).json("wrong username or password")
            res.status(200).json({_id:loginUser._id, username:loginUser.username})

    }catch (error) {

    }
}
