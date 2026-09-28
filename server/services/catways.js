import Catway from "../models/Catway.js";

/**
 * Register a new catway
 *
 * @async
 * @route POST/catways
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 */
export const createNewCatway = async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;
  try {
    const catway = await Catway.create({ catwayNumber, catwayType, catwayState });
    return res.status(201).json({
      message: "catway created",
      catway: {
        id: catway._id,
        catwayNumber: catway.catwayNumber,
        catwayType: catway.catwayType,
        catwayState: catway.catwayState
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
 * Get all catways
 *
 * @async
 * @route GET/catways
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 */
export const getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    if (!catways) {
      return res.status(404).json({ message: "there are no catways created yet" });
    }
    return res.status(200).json(catways);
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};

/**
 * Get a catway using its number as param
 *
 * @async
 * @route GET/catways/:id
 * @param {id} catwayNumber
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Private
 */
export const getCatwayByNumber = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      res.status(404).json({ message: "catway not found" });
    }
    return res.status(200).json(catway);
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};