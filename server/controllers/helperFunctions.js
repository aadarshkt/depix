const res = require("express/lib/response");
const Joi = require("joi");
const { listIndexes, findById } = require("../models/user");
const User = require("../models/user");

const validate = function (body) {
  const schema = {
    token: Joi.string().required(),
    nft: Joi.string().required(),
  };
  return Joi.validate(body, schema);
};

const findUserByToken = async function (token) {
  return User.find({ token: token })
    .then((res) => {
      return {
        data: res,
        userExist: res.length != 0,
        error: false,
        status: 200,
      };
    })
    .catch((_e) => {
      return {
        status: 404,
        userExist: false,
        data: null,
        error: true,
      };
    });
};
const validateNft = (body) => {
  const nftSchema = {
    discription: Joi.string().required(),
    name: Joi.string().required(),
    ipfshash: Joi.string().required(),
    price: Joi.string().required(),
  };
  return Joi.validate(body,nftSchema);
};
const addNftToId = async function (_id, nft) {
  return User.findByIdAndUpdate(
    { _id },
    {
      $addToSet: {
        nfts: {
          ipfshash: nft.ipfshash,
          description: nft.description,
          price: nft.price,
          name: nft.name,
        },
      },
    }
  )
    .then((value) => {
      console.log(value);
      return {
        error: false,
        value,
      };
    })
    .catch((e) => {
      return {
        error: true,
      };
    });
};
module.exports = {
  validate,
  findUserByToken,
  addNftToId,
  validateNft
};
