import mongoose from 'mongoose'
let isConnected= false;
export const connectToDb= async ()=>{
 mongoose.set("strictQuery", true)
 if(isConnected){
    console.log("Mongodb is already connected");
    return;
 }
 try{
    await mongoose.connect(process.env.MONGO_URI);
    isConnected= true;
    console.log("Mongodb connected successfully")
 }catch(err){
    console.log(err)
 }
}