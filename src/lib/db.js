import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_URI_DEV
      : process.env.MONGODB_URI
  );

  connection.isConnected = db.connection.readyState;
}

export default dbConnect;
