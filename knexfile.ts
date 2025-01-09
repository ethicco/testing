import { Knex } from "knex";

const config: Knex.Config = {
  client: "sqlite3",
  connection: { filename: "./dev.sqlite" },
  useNullAsDefault: true,
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

export default config;
