import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Decimal128, Double } from "mongodb";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
    minlength: 6,
  },
  fullName: {
    type: String,
    required: true,
    trim: false,
  },
  cash: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  didSellProj: {
    type: Boolean,
    required: true,
  },
  isExecutingProj: {
    type: Boolean,
    required: true,
  },
  weeklyHours: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
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
 * Method to return an User based on their username and password
 * @param {*} userName
 * @param {*} password
 */
userSchema.statics.findByCredentials = async (userName, password, isAdmin) => {
  const user = await User.findOne({ userName });
  if (!user) return undefined;

  if (isAdmin) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return undefined;
  }

  return user;
};

/**
 * Method to get all users from DB
 */
userSchema.statics.find = async () => {
  
  // const users = await User.find({
  //   isAdmin: { $exists: true },
  // }).exec();

  const users = await User.find({});

  if (!users) return undefined;

  return users;
};

/**
 * method that shall be called before saving the user, so that we cryptograph the password
 */
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.password && user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Creating the model and exporting it
const User = mongoose.model("User", userSchema);
// module.exports = User;

export default User;
