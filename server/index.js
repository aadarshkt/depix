const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const User = require("./models/user");
const Joi = require("joi");
require("dotenv").config();




const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const nftRoute = require("./routes/nft");

const app = express();
const mongoCred = process.env.MONGO_DB;
const dbAccess = mongoCred;
const mongoose = require("mongoose");
const { get } = require("express/lib/response");
const jIO = require("jio");
const { func } = require("joi");
const { use } = require("express/lib/router");
const session = require('express-session');
const cookieParser = require('cookie-parser');

mongoose
  .connect("mongodb+srv://testdepix:testdepix@cluster0.pqtoa.mongodb.net/testdepix?retryWrites=true&w=majority")
  .then((_result) => {
    console.log("Connected to MongoDB.................!!!!");
    app.listen(3001, () => console.log("Listening to 3001 port.........."));
  })
  .catch((e) => console.error(e));
  var cors = require("cors");
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


app.use("/users", userRoute);
app.use("/nft", nftRoute);
app.use("/login", loginRoute);
