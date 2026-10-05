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
 * Get catway all reservations
 *
 * @async
 * @route GET/catways/:id/reservations
 * @param {id} catwayNumber
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 */
export const getCatwayReservations = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const catway = await findCatwayNumber(id);
    console.log(catway);
    const reservations = await Reservation.find({ catwayNumber: catway.catwayNumber });

    return res.status(200).json({ catway, reservations });
  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: "server error" });
  }
};