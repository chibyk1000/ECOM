const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default:false
  },
  role: {
    type: String,
    default: "user",
  },
}, {
    timestamps:true
});

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
