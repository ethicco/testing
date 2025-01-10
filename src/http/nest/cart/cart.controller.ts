import { Controller, Get, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("/carts")
export class CartController {
  private readonly carts = new Map<string, string | Array<string>>();

  @Post("/:username/items/:item")
  async addToCart(
    @Param("username") username: string,
    @Param("item") item: string,
    @Res() res: Response,
  ) {
    const newItems = (this.carts.get(username) || []).concat(item);
    this.carts.set(username, newItems);

    return res.send(newItems);
  }

  @Get("/:username/items")
  async getCarts(@Param("username") username: string, @Res() res: Response) {
    const cart = this.carts.get(username);

    return cart ? res.send(cart) : res.sendStatus(404);
  }
}
