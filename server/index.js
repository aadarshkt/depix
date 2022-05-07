const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const User = require("./models/user");
const Joi = require("joi");
require("dotenv").config();


const loginRoute = require("./routes/user");
const userRouter=require("./routes/login");
const nftRouter=require("./routes/nft");


const app = express();
const mongoCred = process.env.MONGO_DB;
const dbAccess = mongoCred;
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



app.use(loginRoute);
app.use(userRouter);
app.use(nftRouter);

