import cartRouter from "./router";

const carts = new Map<string, string | Array<string>>();

cartRouter.get("/carts/:username/items", (ctx) => {
  const cart = carts.get(ctx.params.username);
  cart ? (ctx.body = cart) : (ctx.status = 404);
});

cartRouter.post("/carts/:username/items/:item", (ctx) => {
  const { username, item } = ctx.params;
  const newItems = (carts.get(username) || []).concat(item);
  carts.set(username, newItems);
  ctx.body = newItems;
});

export default cartRouter;
