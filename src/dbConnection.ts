import knex from "knex";
import config from "../knexfile";

const db = knex(config);

const closeConnection = () => db.destroy();

export { db, closeConnection };
