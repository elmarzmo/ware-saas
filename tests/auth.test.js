import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John Doe",
        email: "john@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
  });

});