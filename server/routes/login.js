const express = require("express");
const helper = require("../controllers/helperFunctions");
const User = require("../models/user");

const router = new express.Router();

router.get("/",(req,res)=>{
  //dont change this
  if(req.session.user){
    res.send({address: req.session.user});
  }else{
    res.send({address: null});
  }
})

router.post("/", async (req, res) => {
  console.log("requesting Post  method...........!!!!");
  const token = req.body.address;
  
  
  //Validating if token provided........
  if (token == null) {
    return res.status(400).send({
      userExist: false,
      error: true,
      message: "Token required",
      status: 400,
      result: null,
      userCreated: false,
    });
  }

  const result = await helper.findUserByToken(token);
  console.log("Inside Post......!!!!");
  console.log(result);
  if (result.userExist) {
    req.session.user = token;
    return res
      .status(302)
      .send({ userExist: true, result: null, userCreated: false, status: 302 });
  }

  // Creating user ...........!!
  const user = new User({ token: token });
  req.session.user = token;
  user.save().then((_result) => {
    res.status(201).send({
      message: "User Created",
      userExist: false,
      result: _result,
      userCreated: true,
      error: false,
      staus: 201,
    });
  });
});

module.exports = router;
