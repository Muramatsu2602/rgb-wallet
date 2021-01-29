import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
});

/**
 * Method that generates a access token, using jsonwebtoken.
 */
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "ICMCJR");
  return token;
};

/**
 * Method to create an User based on their username and password
 * @param {*} login
 * @param {*} password
 */
userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) return undefined;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return undefined;

  return user;
};

/**
 * method that shall be called before saving the user, so that we cryptograph the password
 */
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


// Creating the model and exporting it
const User = mongoose.model('User', userSchema);
module.exports = User;