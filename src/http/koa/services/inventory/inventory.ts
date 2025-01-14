import { BadRequestException } from "../../exception";

export const inventory = new Map<string, number>();

export const removeFromInventory = (item: string) => {
  if (!inventory.has(item) || !inventory.get(item)) {
    const err = new BadRequestException(`${item} is unavailable`);
    err.code = 400;

    throw err;
  }

  inventory.set(item, inventory.get(item) - 1);
};
