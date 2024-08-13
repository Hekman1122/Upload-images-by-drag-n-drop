import mongoose from "mongoose";

const connection: {
  isConnected?: number;
} = {};

async function dbConnection() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI!);
  connection.isConnected = db.connections[0].readyState;
}
//async function returns a promise , we can use .then() to get db
export default dbConnection;
