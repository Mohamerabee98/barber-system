import mongoose from "mongoose";

async function connectDB() {
 await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((error) => {
      console.log("fail to connected db", error.message);
    });
}

export default connectDB