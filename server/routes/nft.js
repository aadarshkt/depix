const express = require("express");
const helper = require("../controllers/helperFunctions");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Inside Nft.........!!!!");

  //validating Error.....
  console.log(req.body);
  const { error } = helper.validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0]);
  }

  // validating User....
  const user = await helper.findUserByToken(req.body.token);
  if (!user.userExist) {
    return res.status(404).send({
      userExist: false,
      message: "User Does not exist",
      result: null,
    });
  }
//   console.log(user);
  // Adding Nft......
  const result = await helper.addNftToId(user.data[0]._id, req.body.nft);
  res.status(201).send({
    message: "Nft added to User account",
    result: result,
    status: 201,
  });
});

module.exports = router;
