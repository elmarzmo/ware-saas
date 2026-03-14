import request from "supertest";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

beforeAll(async () => {
  await connectDB();
});


describe("Auth API", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        organizationName: "TestOrg45",
        name: "John Doe45",
        email: "john45@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
  });

});