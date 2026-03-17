import  request  from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";
import mongoose from "mongoose";

request(app);

const unique = Math.random().toString(36).substring(2, 15);




describe("Stock API", () => {

  let token;
  let productId;

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

    // Create a product to use in stock tests
    const productRes = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        sku: "TEST SKU",
        quantity: 100
      });
  //  expect(productRes.statusCode).toBe(201);
    productId = productRes.body._id;

  });

  it("should create a stock movement", async () => {
    const res = await request(app)
      .post("/api/stock")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId,
        type: "IN",
        quantity: 10
      });

    expect(res.statusCode).toBe(201);

});

});
