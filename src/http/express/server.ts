import express from "express";
import { cartRouter } from "./controller";

const app = express();

app.use("/carts", cartRouter);

export default app.listen(3001);
