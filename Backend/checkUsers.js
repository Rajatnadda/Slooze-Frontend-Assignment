import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
await connectDB();

const users = await User.find({});
console.log("All users in database:");
users.forEach(u => {
  console.log(`Name: ${u.name}, Email: ${u.email}, Role: '${u.role}'`);
});

process.exit(0);
