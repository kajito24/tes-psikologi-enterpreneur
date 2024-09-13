import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI);

  connection.isConnected = db.connection.readyState;
  console.log(connection.isConnected);

  mongoose.connection.on("connected", () =>
    console.log("Connected to MongoDB")
  );
}

export default dbConnect;
