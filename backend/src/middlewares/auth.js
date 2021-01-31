import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "ICMCJR");

    let user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) return res.status(404).send({ error: "Not logged" });

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};
