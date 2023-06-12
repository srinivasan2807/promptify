import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongoose db is already connected");
    return;
  }
  try {
    const { connection } = await mongoose.connect(process.env.MONGOOSE_URI, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log(`Mongodb is connected to ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
