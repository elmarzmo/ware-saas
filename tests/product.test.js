import request from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

beforeAll(async () => {
  await connectDB();
});

describe("Product API", () => {

  let token;
  beforeAll(async () => {
    // Register and login to get a token
    const registerRes = await request(app)
      .post("/api/auth/register")
      .send({
        organizationName: "TestOrg43",
        name: "John Doe43",
        email: "john43@test.com",
        password: "password123"
      });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "john43@test.com",
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
        name: "Laptop43",
        sku: "LAP-00143",
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Laptop43");

  });

});