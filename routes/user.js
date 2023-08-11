const express = require("express")
const router = express.Router();
const usersController = require("../controllers/userController");

//Route
router.get("/", usersController.getAllUsersResponse)
router.get("/:userId", usersController.getUserByIdResponse)
router.post("/", usersController.postUserReponse)
router.put("/role&sex/:userId", usersController.updateRoleSexUserResponse)
router.delete("/d/:userId", usersController.deleteUserByIdResponse)

//Export
module.exports = router;
