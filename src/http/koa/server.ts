import Koa from "koa";
import bodyParser from "koa-body";
import { cartRouter } from "./controllers/cart";

const app = new Koa();

app.use(bodyParser());
app.use(cartRouter.routes());

export default app.listen(3000, () => {
  console.log("Started listen port 3000");
});
