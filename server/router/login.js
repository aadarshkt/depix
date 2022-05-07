const express = require("express");
const helper = require("../controllers/helperFunctions");
const User = require("../models/user");



const router = new express.Router();


router.post("/login", (req, res) => {
  console.log("requesting Post  method...........!!!!");

  const token = req.body.token;
  const result = helper.findUserByToken(req.body.token);
  console.log(result);

  if (result.userExist) {
    return res
      .status(302)
      .send({ userExist: true, result: null, userCreated: false, status: 302 });
  }

  const user = new User({ token: token });
  user.save().then((_result) => {
    res.status(201).send({
      userExist: false,
      result: _result,
      userCreated: true,
      staus: 201,
    });
  });

});

module.exports = router;
