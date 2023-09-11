/** Database connection for cinecoop. */

"use strict";
import { Client } from "pg";

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: process.env.DB_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new Client({
    connectionString: process.env.DB_URI
  });
}

db.connect();

module.exports = db;

// import { Client } from "pg";

// let db;

// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     connectionString: process.env.DB_URI,
//   });
//   db.connect();
// } else {
//   if (!global.db) {
//     db = new Client({ connectionString: process.env.DB_URI });
//     global.db = db;
//     db.connect();
//   }
//   db = global.db;
// }


// module.exports = db;