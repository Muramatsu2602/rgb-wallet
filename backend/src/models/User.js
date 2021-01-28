import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export default class User {}

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true
    }
})

// userSchema.methods.generateAuthToken = async function() {
//     const user = this;
//     const token = jwt.
// }