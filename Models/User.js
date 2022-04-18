const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  role: { type: String, default: "user" },
  emailVerified: { type: Boolean, default: false },
  emailVerificationCode: { type: String },
  image: { type: String },
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);