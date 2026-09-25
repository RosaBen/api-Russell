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
    return res.status(201).json({
      message: "user created", user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};

/**
 * Get all users
 *
 * @async
 * @route GET/users
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "there are no users yet" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};

/**
 * Get a user using email as param
 *
 * @async
 * @route GET/users/:email
 * @param {email} email
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Private
 */
export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password");
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};

/**
 * edit a user found by email
 *
 * @async
 * @route PUT/users/:email
 * @param {email} email
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 * @access Private
 */
export const editUser = async (req, res) => {
  const temp = ({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      Object.keys(temp).forEach(key => {
        if (!!temp[key]) {
          user[key] = temp[key];
        }
      });
    }
    await user.save();
    return res.status(201).json({
      message: "user edited", user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};

/**
 * delete a user
 *
 * @async
 * @route DELETE/users/:email
 * @param {email} email
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 * @access Private
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    await User.deleteOne(user);
    return res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};