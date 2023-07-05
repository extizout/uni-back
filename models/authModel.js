require("dotenv").config();
const { executeQuery } = require("./dbModel");
const bcrypt = require("bcrypt");

const saltRound = 3;

exports.encrypt = async (password, saltRoundi) => {
  return await bcrypt.hash(password, saltRoundi);
};

exports.verifyStrategy = async (email, password, cb) => {
  const selectQuery = "SELECT * FROM user WHERE User_Email = ?";
  const result = await executeQuery(selectQuery, null, [email]);

  if (result.length === 1) {
  } else if (result.length === 0) {
    return cb(null, false, { message: "Email and Password is incorrect." });
  }

  const { User_Password } = result[0];

  bcrypt.compare(password, User_Password).then((isMatch) => {
    if (isMatch) {
      return cb(null, result[0]);
    } else if (!isMatch) {
      return cb(null, false, { message: "Email and Password is incorrect." });
    }
  });
};

exports.insertUser = async (email, password, firstName, lastName) => {
  try {
    const signUpQuery =
      "INSERT INTO user (User_Email, User_Password, User_Role, User_Firstname, User_Lastname) VALUES (?, ?, ?, ? ,?)";
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const result = await executeQuery(signUpQuery, "Signing up", [
      email,
      hashedPassword,
      0,
      firstName,
      lastName,
    ]);

    const { affectedRows, insertId } = result;

    if (affectedRows > 0) {
      return insertId;
    } else if (affectedRows === 0) {
      return null;
    }
  } catch (error) {
    if (error.errno === 1062) {
      error = "DUPE EMAIL FOUND";
    }
    throw error;
  }
};
