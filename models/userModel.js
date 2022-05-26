const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please enter your password confirm"],
    validate: {
      // this only run for save() and create() methods
      validator: function (pc) {
        return pc === this.password;
      },
      message: "Password are not the same.",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
