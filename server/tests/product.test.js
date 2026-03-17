import request from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";
import mongoose from "mongoose";

request(app);

const unique = Math.random().toString(36).substring(2, 15);






describe("Product API", () => {

  let token;
  beforeAll(async () => {
    // Register and login to get a token
    const registerRes = await request(app)
      .post("/api/auth/register")
      .send({
        organizationName: "TestOrg" + unique,
        name: "Test User",
        email: `test${unique}@test.com`,
        password: "password123"
      });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: `test${unique}@test.com`,
        password: "password123",
        organizationId: registerRes.body.organization
      });

    token = loginRes.body.token;
  });

  it("should create a product", async () => {

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        sku: "Test SKU",
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Product");

  });

});