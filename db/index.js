const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_IP,
  database: process.env.DATABASE_NAME
});

module.exports = pool;
