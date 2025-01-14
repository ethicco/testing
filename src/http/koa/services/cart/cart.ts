import { removeFromInventory } from "../inventory";
import logger from "src/logger";

export const carts = new Map<string, Array<string>>();

export const addItemToCart = (username: string, item: string) => {
  removeFromInventory(item);

  const newItems = (carts.get(username) || []).concat(item);

  carts.set(username, newItems);

  logger.log(`${item} added to ${username}'s cart`);

  return newItems;
};

export const compliesToItemLimit = (cart: Array<string>) => {
  const unitsPerItem = cart.reduce(
    (itemMap, itemName) => {
      const quantity = (itemMap[itemName] || 0) + 1;

      return { ...itemMap, [itemName]: quantity };
    },
    {} as Record<string, number>,
  );

  return Object.values(unitsPerItem).every((quantity) => quantity < 3);
};
