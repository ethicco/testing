import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("carts", (table) => {
    table.increments("id");
    table.string("username");
  });

  await knex.schema.createTable("carts_items", (table) => {
    table.integer("cartId").references("carts.id");
    table.string("itemName");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("carts");
  await knex.schema.dropTable("carts_items");
}
