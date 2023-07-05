const express = require("express")
const router = express.Router();

//Route
router.get("/", (req, res) => {
  res.status(200).send({message: "Welcome"});
})

router.get("/High", (req, res) => {
  res.status(200).send({message: "High"});
})

//Export
module.exports = router;
