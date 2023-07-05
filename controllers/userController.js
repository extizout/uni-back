//userController.js
const { handleErrorResponse } = require("../models/handleErrorResponse")
const User = require("../models/userModel")

exports.getAllUsersResponse = async (req, res) => {
  try {

    const results = await User.getAllUsers();
    res.status(200).json({ message: "Get All Users Successfully.", results });

  } catch (error) {

    handleErrorResponse(res, error, 500);

  }
};

exports.getUserByIdResponse = async (req, res) => {
  try {

    const { userId } = req.params;
    const result = await User.getUserById(userId);
    if (result.length > 0) {

      res.status(200).json({ message: "Get " + userId + " User Successfully.", result });

    } else {

      res.status(404).json({ error: "Invalid User or Not Found" });

    }
  } catch (error) {

    handleErrorResponse(res, error, 500);

  }
};

exports.postUserReponse = async (req, res) => {
  try {

    const userRequestData = req.body;
    const result = await User.postUser(userRequestData);

    res.status(201).json({ message: "Post User Successfully.", result });

  } catch (error) {

    if (error === "Role's type or value is invalid.") {
      res.status(400).json({ error: "Role's type or value is invalid." });
    } else {
      handleErrorResponse(res, error, 500);
    }

  }
};

exports.updateRoleUserResponse = async (req, res) => {
  try {

    const { role } = req.body;
    const { userId } = req.params;
    const result = await User.updateRoleUser(userId, role);

    res.status(200).json({ message: `Updated ${userId}'s intRole Successfully.`, result });

  } catch (error) {
    if (error === "Role's type or value is invalid.") {
      res.status(400).json({ error: "Role is invalid." });
    } else {
      handleErrorResponse(res, error, 500);
    }

  }
};


exports.deleteUserByIdResponse = async (req, res) => {
  try {

    const { userId } = req.params;
    const result = await User.deleteUserById(userId);
    res.status(204).json({ message: `Delete ${userId} Successfully.`, result });

  } catch (error) {

    handleErrorResponse(res, error, 500);

  }
};
