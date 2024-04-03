import mongoose from "mongoose";
export const connnectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    const connect = await mongoose.connect(MONGODB_URI);
    console.log(`mongodb connected at ${connect.connection.host} `);
  } catch (error) {
    console.log(error);
  }
};
