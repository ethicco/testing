import { db } from "@/db";

const createCart = (username: string) => {
  return db("carts").insert({ username });
};

const addItem = (cartId: number, itemName: string) => {
  return db("carts_items").insert({ cartId, itemName });
};

export { createCart, addItem };
