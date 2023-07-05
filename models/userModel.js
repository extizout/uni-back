//userModel.js
const { executeQuery } = require("../models/dbModel");

async function roleValidate(roleInput) {
  const intRole = parseInt(roleInput, 10);
  const roleFaultValidation =
    typeof intRole != "number" ||
    -1 >= intRole ||
    intRole >= 4 ||
    isNaN(intRole);

  if (roleFaultValidation) {
    const error = "Role's type or value is invalid.";
    throw error;
  }

  return intRole;
}

exports.getAllUsers = async () => {
  try {
    const getAllUsersQuery = "SELECT * FROM user";
    const results = await executeQuery(getAllUsersQuery, {
      message: "Get All Users Successfully.",
    });

    return results;
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (userId) => {
  try {
    const getUserByIdQuery =
      "SELECT *, CONVERT_TZ(User_Create_At, '+00:00', '+07:00') AS Converted_User_At FROM user WHERE User_Id = ?";

    const result = await executeQuery(
      getUserByIdQuery,
      { message: "Find " + userId + " User Successfully." },
      [userId]
    );

    return result;
  } catch (error) {
    throw error;
  }
};

exports.postUser = async (userDataObject) => {
  try {
    const { email, password, firstName, lastName, sex, role } = userDataObject;
    const roleValidated = await roleValidate(role);
    const postUserQuery =
      "INSERT INTO user (User_Email, User_Password, User_Firstname, User_Lastname, User_Sex, User_Role) VALUES (?, ?, ?, ?, ?, ?)";
    const result = await executeQuery(
      postUserQuery,
      { message: "Post User Successfully." },
      [email, password, firstName, lastName, sex, roleValidated]
    );

    return result;
  } catch (error) {
    if (error.errno === 1062) {
      error = "DUPE EMAIL FOUND";
    }
    throw error;
  }
};

exports.updateRoleUser = async (userId, role) => {
  try {
    const roleValidated = await roleValidate(role);
    const updateUserQuery = "UPDATE user SET User_Role = ? WHERE User_Id = ? ";
    const results = await executeQuery(
      updateUserQuery,
      { message: "Update User Successfully." },
      [roleValidated, userId]
    );

    if (results.affectedRows < 1) {
      throw "The Query is fail.";
    }

    return results;
  } catch (error) {
    throw error;
  }
};

exports.deleteUserById = async (userId) => {
  try {
    const updateUserQuery = "DELETE FROM user WHERE User_ID = ?";
    const result = await executeQuery(
      updateUserQuery,
      { message: `Deleting ${userId} Successfully.` },
      [userId]
    );

    return result;
  } catch (error) {
    throw error;
  }
};
