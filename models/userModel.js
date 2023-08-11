//userModel.js
const { executeQuery } = require("../models/dbModel");

function filterUserSensitive(user) {
  //Filter hashed_password out
  const { hashed_password, ...rest } = user;

  const filteredUserSensitive = {
    userId: rest.user_id,
    email: rest.email,
    firstName: rest.first_name,
    lastName: rest.last_name,
    sex: rest.sex,
    role: rest.role,
    createDate: rest.create_at,
  };
  return filteredUserSensitive;
}

async function roleValidate(roleInput) {
  const roleLists = ["member", "staff", "admin"];
  const isValidRole =
    typeof roleInput === "string" && roleLists.includes(roleInput);

  if (isValidRole) {
    return roleInput;
  } else {
    const error = "Role's type or value is invalid.";
    throw error;
  }
}

async function sexValidate(sexInput) {
  const sexLists = ["Female", "Male"];
  const isValidSex =
    typeof sexInput === "string" && sexLists.includes(sexInput);

  if (isValidSex) {
    return sexInput;
  } else {
    const error = "Sex's type or value is invalid";
    throw error
  }
}

exports.getAllUsers = async () => {
  try {
    const getAllUsersQuery = "SELECT * FROM user";
    const results = await executeQuery(getAllUsersQuery, {
      message: "Get All Users Successfully.",
    });

    const filteredResults = results.map(filterUserSensitive);
    return filteredResults;
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (userId) => {
  try {
    const getUserByIdQuery =
      "SELECT *, CONVERT_TZ(create_at, '+00:00', '+07:00') AS th_create_at FROM user WHERE user_id = ?";

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
      "INSERT INTO user (email, hashed_password, first_name, last_name, sex, role) VALUES (?, ?, ?, ?, ?, ?)";
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

exports.updateRoleSexUser = async (userId, role, sex) => {
  try {
    const roleValidated = await roleValidate(role);
    const sexValidated = await sexValidate(sex);
    const updateRoleSexUserQuery =
      "UPDATE user SET role = ?, sex = ? WHERE user_id = ? ";
    const results = await executeQuery(
      updateRoleSexUserQuery,
      { message: "Update User Successfully." },
      [roleValidated, sexValidated, userId]
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
    const updateUserQuery = "DELETE FROM user WHERE user_id = ?";
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
