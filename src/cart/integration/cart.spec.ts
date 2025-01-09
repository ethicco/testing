import { db, closeConnection } from "@/db";
import { addItem, createCart } from "./cart";

beforeEach(async () => {
  await db("carts").truncate();
  await db("carts_items").truncate();
});

afterAll(async () => closeConnection());

test("createCart creates a cart for a username", async () => {
  await createCart("Lucas da Costa");

  const result = await db.select("username").from("carts");
  expect(result).toEqual([{ username: "Lucas da Costa" }]);
});

test("addItem adds an item to a cart", async () => {
  const username = "Lucas da Costa";

  await createCart(username);

  const { id: cartId } = await db
    .select<{ id: number }>()
    .from("carts")
    .where({ username });

  await addItem(cartId, "cheesecake");
  const result = await db
    .select<Array<{ cartId: number; itemName: string }>>("itemName")
    .from("carts_items");

  expect(result).toEqual([{ cartId, itemName: "cheesecake" }]);
});
