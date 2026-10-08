import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "You need to login" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "unknown user" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.error("protect", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "token expiré" });
    }
    return res.status(401).json({ message: "token invalid" });
  }
};