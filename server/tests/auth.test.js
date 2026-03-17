import request from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";
import mongoose from "mongoose";

request(app);

const unique = Math.random().toString(36).substring(2, 15);




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