import mongoose from "mongoose";
import { connectDB } from "../src/config/db.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});