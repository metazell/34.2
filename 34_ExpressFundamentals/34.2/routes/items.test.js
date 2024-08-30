const request = require("supertest");
const app = require("../app"); 
let items = require("../fakeDb");


beforeEach(() => {
  items.length = 0;
  items.push({ name: "popsicle", price: 1.45 });
});

describe("GET /items", () => {
  test("Get list of items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
  });
});

describe("POST /items", () => {
  test("Add a new item", async () => {
    const res = await request(app).post("/items").send({ name: "cheerios", price: 3.40 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "cheerios", price: 3.40 } });
  });
});

describe("GET /items/:name", () => {
  test("Get a single item by name", async () => {
    const res = await request(app).get(`/items/popsicle`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
  });

  test("Respond with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/invalid`);
    expect(res.statusCode).toBe(404);
  });
});

describe("PATCH /items/:name", () => {
  test("Update a single item's name and price", async () => {
    const res = await request(app).patch(`/items/popsicle`).send({ name: "new popsicle", price: 2.45 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: "new popsicle", price: 2.45 } });
  });

  test("Respond with 404 for invalid item", async () => {
    const res = await request(app).patch(`/items/invalid`).send({ name: "new popsicle", price: 2.45 });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Delete a single item", async () => {
    const res = await request(app).delete(`/items/popsicle`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });

  test("Respond with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/invalid`);
    expect(res.statusCode).toBe(404);
  });
});
