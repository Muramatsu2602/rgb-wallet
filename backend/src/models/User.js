import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
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
  // TODO: adding other fields that constitute the User
  // name: {
  //   type: String,
  //   required: true,
  //   trim: false,
  // },
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
 * @param {*} userName
 * @param {*} password
 */
userSchema.statics.findByCredentials = async (userName, password) => {
  const user = await User.findOne({ userName });
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
const User = mongoose.model("User", userSchema);
// module.exports = User;

export default User;
