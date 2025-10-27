import mongoose from "mongoose";

const connectDB = async()=>{
    try {
      await mongoose.connect(process.env.DATA_URI);
      console.log(`connect successfully`) 
    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;