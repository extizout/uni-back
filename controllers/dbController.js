const db = require("../config/dbConfig")
const { executeQuery } = require("../models/dbModel")

exports.connect = async () => {
  // Connecting to Mysql Database
  try {

    const createDatebaseQuery = "CREATE DATABASE IF NOT EXISTS " + db.database;
    await executeQuery(createDatebaseQuery, "DATABASE created or already exists");

  } catch (err) {
    console.error("Error while connecting to MySQL database:", err);
  }
}

exports.createUsersTable = async () => {
  try {

    await executeQuery("USE " + db.database, "Using " + db.database + " for Create Users TABLE if it not exsist.");

    const createUsersTableQuery = " CREATE TABLE IF NOT EXISTS user  (user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT, email varchar(100) UNIQUE NOT NULL, hashed_password VARCHAR(100), first_name VARCHAR(50), last_name VARCHAR(50), sex VARCHAR(10), role ENUM('member', 'staff', 'admin') NOT NULL, create_at DATETIME DEFAULT NOW());";
    await executeQuery(createUsersTableQuery, "Table created or already exists");

  } catch (err) {
    console.error("Error while creating users table:", err);
  }
}
