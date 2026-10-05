import Reservation from "../models/Reservation.js";
import Catway from "../models/Catway.js";


/**
 * find the catwayNumber
 *
 * @export
 * @async
 * @param {catwayNumber} catwayNumber 
 * @returns {number} 
 */
async function findCatwayNumber (catwayNumber) {
  const catway = await Catway.findOne({ catwayNumber });
  if (!catway) {
    const error = new Error("catway not found");
    error.statusCode = 404;
    throw error;
  }
  return catway;
}


/**
 * Get all reservations
 *
 * @async
 * @route GET/catways/reservations
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 */
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    if (!reservations) {
      return res.status(404).json({ message: "there are no reservations created yet" });
    }
    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};