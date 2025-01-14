import app from "../../server";
import { inventory, carts } from "../../services";
import request from "supertest";

afterAll(() => app.close());
afterEach(() => inventory.clear());
afterEach(() => carts.clear());

describe("add items to a cart", () => {
  test("adding available items", async () => {
    inventory.set("cheesecake", 3);

    const response = await request(app)
      .post("/carts/test_user/items")
      .send({ item: "cheesecake", quantity: 3 })
      .expect(200)
      .expect("Content-Type", /json/);

    const newItems = ["cheesecake", "cheesecake", "cheesecake"];
    expect(response.body).toEqual(newItems);
    expect(inventory.get("cheesecake")).toEqual(0);
    expect(carts.get("test_user")).toEqual(newItems);
  });

  test("item is unavailable", async () => {
    const response = await request(app)
      .post("/carts/test_user/items")
      .send({ item: "cheesecake", quantity: 3 });

    expect(response.status).toBe(400);
  });

  test("available items in cart", async () => {
    carts.set("lucas", ["cheesecake"]);

    const response = await request(app).get("/carts/lucas/items");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(["cheesecake"]);
    expect(carts.get("lucas")).toHaveLength(1);
  });

  test("cart items not found", async () => {
    const response = await request(app).get("/carts/lucas/items");

    expect(response.status).toBe(404);
  });

  test("remove item from cart", async () => {
    carts.set("lucas", ["cheesecake"]);

    expect(carts.get("lucas")).toHaveLength(1);

    const response = await request(app).delete("/carts/lucas/items/cheesecake");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(0);
    expect.assertions(3);
  });

  test("item is not in the cart", async () => {
    const response = await request(app).delete("/carts/lucas/items/cheesecake");

    expect(response.status).toBe(400);
  });
});
