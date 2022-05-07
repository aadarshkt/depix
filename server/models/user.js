const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const userScheme = new Scheme({
  token: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  nfts: {
    type: Array,
  },
},{timestamps:true});
const User=mongoose.model('User',userScheme);
module.exports=User;
