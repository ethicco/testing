import Koa from "koa";
import { cartRouter } from "./controllers";

const app = new Koa();

app.use(cartRouter.routes());

export default app.listen(3000);
