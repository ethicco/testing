import cartRouter from "./router";

const carts = new Map<string, string | Array<string>>();

cartRouter.get("/:username/items", (req, res) => {
  const cart = carts.get(req.params.username);
  cart ? (req.body = cart) : (req.statusCode = 404);
  cart ? res.json(cart) : res.sendStatus(404);
});

cartRouter.post("/:username/items/:item", (req, res) => {
  const { username, item } = req.params;
  const newItems = (carts.get(username) || []).concat(item);
  carts.set(username, newItems);

  res.json(newItems);
});

export default cartRouter;
