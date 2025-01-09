import fetch from "isomorphic-fetch";
import app from "./server";

const apiRoot = "http://localhost:3000";

const addItem = (username: string, item: string) => {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
    method: "POST",
  });
};

const getItems = (username: string) => {
  return fetch(`${apiRoot}/carts/${username}/items`, { method: "GET" });
};

afterAll(() => app.close());

test("adding items to a cart", async () => {
  const initialResponse = await getItems("lucas");
  expect(initialResponse.status).toEqual(404);

  const addItemResponse = await addItem("lucas", "cheesecake");
  expect(await addItemResponse.json()).toEqual(["cheesecake"]);

  const finalItemsResponse = await getItems("lucas");
  expect(await finalItemsResponse.json()).toEqual(["cheesecake"]);
});
