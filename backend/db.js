const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  fname: String,
  lname: String,
  //   Question: String,
  userId: ObjectId,
});
const UserModel = mongoose.model("User", User, "User");

module.exports = {
  UserModel: UserModel,
};
