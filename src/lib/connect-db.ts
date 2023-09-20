import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;
