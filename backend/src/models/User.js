import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Decimal128, Double } from "mongodb";
import { response } from "express";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: false,
  },
  password: {
    type: String,
    required: false,
    trim: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
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
  cash: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
userSchema.statics.findAllUsers = async (isAdminField) => {
  const users = await User.find({
    isAdmin: isAdminField,
  });

  if (!users) return undefined;

  return users;
};

/**
 * method to delete an user given their userName
 */
userSchema.statics.deleteUser = async (userNameField) => {
  // https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
  const response = await User.deleteOne({ userName: userNameField });

  if (!response) return undefined;
  // boolean
  return response;
};

/**
 * method to update user given their userName
 */
userSchema.statics.updateUser = async (editedUser) => {
  const response = await User.findOneAndUpdate(
    { userName: editedUser.originalUserName },
    {
      fullName: editedUser.fullName,
      userName: editedUser.userName,
      didSellProj: editedUser.didSellProj,
      isExecutingProj: editedUser.isExecutingProj,
      weeklyHours: editedUser.weeklyHours,
    }
  );

  if (!response) return undefined;
  // boolean
  return response;
};

/**
 * method to add credit to all users according to their properties
 */
userSchema.statics.addCred = async () => {
  //there's a lot of identifiers, like $inc, $set
  //$inc - increments the value of the field by the amount specified
  try {
    const users = User.find({
      isAdmin: isAdminField,
    });
    users.forEach(async (user) => {
      user.cash +=
        (40 + 5 * user.weeklyHours) *
        (1 + (user.didSellProj && 0, 2) + (user.isExecutingProj && 0, 1));
      await User.updateOne(
        { fulName: user.fullName },
        { $inc: { $cash: user.cash } }
      );
    });
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(400).send();
  }
};

/**
 * method to delete an user given their userName
 */
userSchema.statics.eraseCred = async () => {
  const response = await User.updateMany({ $set: { cash: 0 } });

  if (!response) return undefined;
  // boolean
  return response;
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

export default User;
