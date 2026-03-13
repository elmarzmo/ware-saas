import request from "supertest";
import app from "../src/app.js";

describe("Product API", () => {

  it("should create a product", async () => {

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer TOKEN`)
      .send({
        name: "Laptop",
        sku: "LAP-001",
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Laptop");

  });

});