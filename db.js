/** Database connection for cinecoop. */

import { Client } from "pg";

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: process.env.DB_URI,
  });
} else {
  if (!global.db) {
    global.db = new Client({ connectionString: process.env.DB_URI });
  }
  db = global.db;
}

db.connect();

module.exports = db;