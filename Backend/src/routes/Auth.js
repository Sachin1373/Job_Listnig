import express from 'express'
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from'jsonwebtoken'
import dotenv from 'dotenv'
import asynchandler from '../Utils/asynchandler.js'


dotenv.config({
    path:'./.env'
})

const router = express.Router();

//SignUp route
router.post('/signup',  asynchandler(async(req,res)=>{
    const {name,email,mobile,password} = req.body;

   
        const UserExist =  await User.findOne({email})
        if(UserExist){
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const HashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({ name, email, mobile, password: HashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

     
}))

//Login route
router.post("/login", asynchandler(async (req, res) => {
   
      const { email, password } = req.body;
  
      if (!email || !password) {
        res.json({
          message: "fields can't empty",
        });
      }
      
      const userExist = await User.findOne({ email });
  
      
      if (userExist) {
        const passwdMatched = await bcrypt.compare(password, userExist.password);
  
        if (!passwdMatched) {
          return res.status(500).json({
            status: "FAILED",
            message: "password wrong",
          });
        }
  
        const jwtToken = jwt.sign(userExist.toJSON(), process.env.JWT_SECRET_KEY, {
          expiresIn: 3600,
        });
        res.json({
          status: "SUCCESS",
          message: `${userExist.name} signed in successfully`,
          recuirterName: userExist.name,
          jwtToken,
        });
      }
  
      
      else {
        res.status(500).json({
          status: "FAILED",
          message: "user not exist,Please Register First",
        });
      }
    
  }))

export default router;