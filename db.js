/** Database connection for cinecoop. */


import { Client } from "pg";

const db = new Client({
  connectionString: process.env.DB_URI
});

db.connect();


module.exports = db;
