import  request  from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

beforeAll(async () => {
  await connectDB();
});


describe("Stock API", () => {

  let token;
  let productId;

  beforeAll(async () => {
    // Register and login to get a token
    const registerRes = await request(app)
      .post("/api/auth/register")
      .send({
        organizationName: "TestOrg44",
        name: "Stock Doe44",
        email: "stock44@test.com",
        password: "password123"
      });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "stock44@test.com",
        password: "password123",
        organizationId: registerRes.body.organization
      });

    token = loginRes.body.token;

    // Create a product to use in stock tests
    const productRes = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product44",
        sku: "TEST-00144",
        quantity: 100
      });
    productId = productRes.body._id;

  });

  it("should create a stock movement", async () => {
    const res = await request(app)
      .post("/api/stock")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId,
        type: "IN",
        quantity: 5
      });

    expect(res.statusCode).toBe(201);

});

});