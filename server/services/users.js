import User from "../models/User.js";

/**
 * Register a new user
 *
 * @async
 * @route POST/users
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 */
export const createNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "this email/user exist already" });
    }

    const user = await User.create({ username, email, password });
    return res.status(201).json({ message: "user created" });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error", user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  }
};