const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const User = require("./models/user");
const Joi = require("joi");
const loginRoute = require("./router/login");



const app = express();
require("dotenv").config();
const mongoCred = process.env.MONGO_CRED;
const dbAccess = `mongodb+srv://testdepix:testdepix@cluster0.pqtoa.mongodb.net/testdepix?retryWrites=true&w=majority`;
const mongoose = require("mongoose");
const { get } = require("express/lib/response");
const jIO = require("jio");
const { func } = require("joi");
const { use } = require("express/lib/router");

mongoose
  .connect(dbAccess)
  .then((_result) => {
    console.log("Connected to MongoDB.................!!!!");
    app.listen(3000, () => console.log("Listening to 30000 port.........."));
  })
  .catch((e) => console.error(e));

app.use(express.json());
// Getting all The Users Available

app.get("/users", (req, res) => {
  User.find().then((result) => {
    res.send(result);
  });
});
app.use(loginRoute)


//Getting the Perticular User information stored in Server
app.get("/users/:token", (req, res) => {
  console.log("Inside Token");
  const userToken = req.params.token;
  console.log(typeof userToken);

  //   const result = User.find({ token: userToken }, (error, data) =>
  //     console.log(data)
  //   );
  //   console.log(result);
  const result = findUserByToken(userToken);
  console.log("I am Back....!!!!");
  console.log(result);
  //   if (result) {
  //     res.status(200).send({ status: 200, result: result });
  //     return;
  //   }
  //   res.status(404).send({ stattus: 404, result: null });
});


//Adding nft to User
app.post("/nft", (req, res) => {
  console.log("Inside Nft.........!!!!");

  //validating Error.....
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0]);
  }

  // validating User....
  const user = findUserByToken(req.body.token);
  if (!user.userExist) {
    return res.status(404).send({
      userExist: false,
      message: "User Does not exist",
      result: null,
    });
  }

  // Adding Nft......
  const result = addNftToId(user.result._id, req.body.nft);
  res.status(201).send({
    message: "Nft added to User account",
    result: result,
    status: 201,
  });
});
