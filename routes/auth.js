const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//Route
router.get("/", authController.isAuthenticated);
router.get("/getUser", authController.getUserData);
router.post("/login", authController.logIn);
router.post("/signup", authController.register);
router.post("/logout", authController.logOut);
//Test Route
router.post("/test", (req, res) => {
  const checkAuth = req.isAuthenticated();
  checkAuth ? console.log("Authenticated") : console.log("fail");
  console.log("Req.session : ", req.session);
  console.log("Req.sessionID : ", req.sessionID);
  console.log("Req.body : ", req.body);
  console.log("Req.user : ", req.user);
  console.log("Req.cookie : ", req.cookies);
  res.send();
});

//Export
module.exports = router;
