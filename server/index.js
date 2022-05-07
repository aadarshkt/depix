const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const User = require("./models/user");
const Joi = require("joi");

const app = express();
require("dotenv").config();
const mongoCred = process.env.MONGO_CRED;
const dbAccess = `mongodb+srv://testdepix:testdepix@cluster0.pqtoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoose = require("mongoose");
const { get } = require("express/lib/response");
const jIO = require("jio");
const { func } = require("joi");
const { use } = require("express/lib/router");
const session = require('express-session');
const cookieParser = require('cookie-parser');

mongoose
  .connect(dbAccess)
  .then((_result) => {
    console.log("Connected to MongoDB.................!!!!");
    app.listen(3001, () => console.log("Listening to 3001 port.........."));
  })
  .catch((e) => console.error(e));
  var cors = require("cors");
const router = require("./router/login");
  app.use(cors({
    origin: '*',
    credentials: true
  }));
  app.use((req,res,next)=>{
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next();
  })
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  //setting up sessions
  app.use(cookieParser());
  app.use(session({
    key: "userAddress",
    secret: "keepitsecret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      exprires: 60*60*24
    }
  }))

app.use(router);
// Getting all The Users Available

app.get("/users", (req, res) => {
  User.find().then((result) => {
    res.send(result);
  });
});

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

//Creating the User
app.post("/users", (req, res) => {
  console.log("requesting Post  method...........!!!!");
  const token = req.body.token;
  const result = findUserByToken(token);
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

function validate(body) {
  const schema = {
    token: Joi.string().required(),
    nft: Joi.string().required(),
  };
  return Joi.validate(body, schema);
}

function findUserByToken(token) {
  let result;
  User.find({ token: token }, (error, data) => {
    if (error) result = null;
    if (data) result = data;
  });
  console.log(result);
  if (!result) {
    return {
      status: 404,
      userExist: false,
      result: null,
    };
  }

  return {
    status: 302,
    userExist: true,
    result: result,
  };
}

async function addNftToId(_id, nft) {
  return User.findByIdAndUpdate(
    { _id },
    {
      $addToSet: {
        nfts: nft,
      },
    }
  );
}
