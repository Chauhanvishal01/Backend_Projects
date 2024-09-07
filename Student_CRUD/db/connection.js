import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI);
    console.log("Connect to MONGODB DATABSE");
  } catch (err) {
    console.log(`Error while connected to mongoDB:-> ${err.message}`);
  }
};
