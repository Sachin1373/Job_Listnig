import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})

const dbconnect = async() =>{
   try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB CONNECTED!!!!")
    
   } catch (error) {
     console.log("DB NOT CONNECTED!!!!!!");
     
   }
}

export default dbconnect