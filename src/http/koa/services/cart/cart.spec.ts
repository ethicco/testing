import fs from "node:fs";
import config from "src/config";

import { inventory } from "../inventory";
import { carts, addItemToCart, compliesToItemLimit } from "./cart";
import { BadRequestException } from "../../exception";

describe("addItemToCart", () => {
  beforeEach(() => {
    fs.writeFileSync(config.logsPath, "");
  });

  test("adding unvailable items to cart", async () => {
    carts.set("test_user", []);
    inventory.set("cheesecake", 0);

    try {
      addItemToCart("test_user", "cheesecake");
    } catch (error) {
      const expectedError = new BadRequestException(
        "cheesecake is unavailable",
      );
      expectedError.code = 400;
      expect(error).toEqual(expectedError);
    }

    expect(carts.get("test_user")).toEqual([]);
    expect.assertions(2);
  });
});

describe("compliesToItemLimit", () => {
  test("returns true for carts with no more than 3 items of a kind", () => {
    const cart = ["cheesecake", "cheesecake", "almond brownie", "apple pie"];

    expect(compliesToItemLimit(cart)).toBe(true);
  });

  test("returns false for carts with more than 3 items of a kind", () => {
    const cart = [
      "cheesecake",
      "cheesecake",
      "almond brownie",
      "cheesecake",
      "cheesecake",
    ];

    expect(compliesToItemLimit(cart)).toBe(false);
  });
});
