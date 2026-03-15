import request from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";
import mongoose from "mongoose";

const unique = Date.now();

beforeAll(async () => {
  await connectDB();
 
});
beforeAll (async () => {
  // Clear the database before each test
 const collection = mongoose.connection.collections;
  for (let key in collection) {
    await collection[key].deleteMany({});
  }
});




describe("Auth API", () => {

  it("should register a new user", async () => {
     
    const res = await request(app)
    
      .post("/api/auth/register")
      .send({
        organizationName: "TestOrg" + unique,
        name: "test user",
        email: `test${unique}@test.com`,
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
  });



});

afterAll(async () => {
  await mongoose.connection.close();
});