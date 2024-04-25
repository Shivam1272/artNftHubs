const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required. Please enter your name."],
    trim: true,
  },
  walletaddress: {
    type: String,
    required: [true, "Wallel Address is required to upload a profile"],
    trim: true,
    minlength: [42, "Address length must be 42."],
  },
  email: {
    type: String,
    required: [
      true,
      "Email address is required. Please provide an Email Address.",
    ],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  description: {
    type: String,
  },
  photo: {
    type: Buffer,
    default: undefined,
  },
});

const USER = mongoose.model("USER", userSchema);

module.exports = USER;
