import { addItemToCart } from "../../services/cart";
import cartRouter from "../router";
import { carts } from "../../services/cart";
import { inventory } from "../../services/inventory";

cartRouter.get("/carts/:username/items", (ctx) => {
  const cart = carts.get(ctx.params.username);
  cart ? (ctx.body = cart) : (ctx.status = 404);
});

cartRouter.post("/carts/:username/items", (ctx) => {
  const { username } = ctx.params;
  const { item, quantity } = ctx.request.body as {
    item: string;
    quantity: number;
  };

  for (let i = 0; i < quantity; i++) {
    try {
      const newItems = addItemToCart(username, item);

      ctx.body = newItems;
    } catch (error) {
      ctx.body = { message: error.message };
      ctx.status = error.code;
    }
  }
});

cartRouter.delete("/carts/:username/items/:item", (ctx) => {
  const { username, item } = ctx.params;

  if (!carts.has(username) || !carts.get(username).includes(item)) {
    ctx.body = { message: `${item} is not in the cart` };
    ctx.status = 400;
    return;
  }

  const newItems = carts.get(username).filter((i) => i !== item);

  inventory.set(item, (inventory.get(item) || 0) + 1);
  carts.set(username, newItems);

  ctx.body = newItems;
});

export default cartRouter;
