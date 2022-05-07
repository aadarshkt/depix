const express = require("express");
const helper = require("../controllers/helperFunctions");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("inside users.....!!!");
  User.find().then((result) => {
    res.send(result);
  });
});

router.get("/:token", async (req, res) => {
  console.log("Inside Token");
  const userToken = req.params.token;
  console.log(typeof userToken);

  const result = await helper.findUserByToken(userToken);
  console.log("I am Back....!!!!");
  console.log(result);
  if (result.error) {
    res.status(404).send(result);
  } else res.status(200).send(result);
});
module.exports = router;
