it("should increase stock with IN movement", async () => {

  const res = await request(app)
    .post("/api/stock")
    .set("Authorization", `Bearer TOKEN`)
    .send({
      productId: PRODUCT_ID,
      type: "IN",
      quantity: 5
    });

  expect(res.statusCode).toBe(201);

});