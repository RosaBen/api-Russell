import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * generate a token when logging in
 *
 * @export
 * @param {user} user 
 * @returns {string} 
 */
export function generateToken (user) {
  const expirIn = 24 * 60 * 60;
  return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
    expiresIn: expirIn
  });
}

/**
 * login 
 *
 * @async
 * @route POST/login
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise} 
 */
export const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "wrong credentials"
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000
    };

    res.cookie("token", token, options);

    return res.status(200).json({
      message: "login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: "server error" });
  }
};

/**
 * logout
 *
 * @async
 * @route GET/logout
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise} 
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(200).json({ message: "session terminated" });
  } catch (error) {
    console.error(error);

    return res.status(501).json({ message: "server error" });
  }
};