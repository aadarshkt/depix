const res = require("express/lib/response");
const Joi = require("joi");
const User = require("../models/user");

const validate = function (body) {
  const schema = {
    token: Joi.string().required(),
    nft: Joi.string().required(),
  };
  return Joi.validate(body, schema);
};

const findUserByToken = function (token) {
  let result = {
    userExist: false,
    result: null,
    status: 404,
  };
  User.find({ token: token }, (error, data) => {
    console.log(error);
    console.log(data);
    if (data) {
      result.userExist = true;
      result.result = data;
      result.status = 201;
    }
  });
  console.log(result);
  return result;
};

const addNft = async function (_id, nft) {
  return User.findByIdAndUpdate(
    { _id },
    {
      $addToSet: {
        nfts: nft,
      },
    }
  );
};
module.exports = {
  validate,
  findUserByToken,
  addNft,
};
