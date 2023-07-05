require("dotenv").config();
const mysql = require("mysql2")

module.exports = {
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  databaseSession: process.env.SESSION_STORE_DB,
  sessionKey: process.env.SESSION_KEY,
  sessionSecret: process.env.SESSION_SECRET,
  cookieMaxAge: process.env.COOKIE_MAXAGE || 1000 * 60 * 5 ,
  sessionName: process.env.SESSION_NAME || "Uni"
};
