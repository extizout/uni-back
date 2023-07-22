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

    const createUsersTableQuery = "CREATE TABLE IF NOT EXISTS user (User_Id int NOT NULL PRIMARY KEY AUTO_INCREMENT, User_Email varchar(100) UNIQUE NOT NULL, User_Password VARCHAR(100), User_Firstname VARCHAR(50), User_Lastname VARCHAR(50), User_Sex CHAR(1), User_Role ENUM('member', 'staff', 'admin') NOT NULL, User_Create_At DATETIME DEFAULT NOW());";
    await executeQuery(createUsersTableQuery, "Table created or already exists");

  } catch (err) {
    console.error("Error while creating users table:", err);
  }
}
