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

    const reservations = await Reservation.find({ catwayNumber: catway.catwayNumber });
    if (!reservations) {
      return res.status(404).json({
        message: `Reservations for this catway ${catway.catwayNumber} is not found`
      });
    }

    return res.status(200).json({ reservations });
  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: "server error" });
  }
};

/**
 * Get an existing reservation for the selected catway
 *
 * @async
 * @route GET/catways/:id/reservations/:idReservation
 * @param {id} catwayNumber
 * @param {idReservation} reservation_id
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 */
export const getCatwayReservationByID = async (req, res) => {
  try {
    const { idReservation, id } = req.params;
    const catway = await findCatwayNumber(id);
    const reservation = await Reservation.findOne({
      _id: idReservation,
      catwayNumber: catway.catwayNumber
    });
    if (!reservation) {
      return res.status(404).json({
        message: `Reservation not found for this catway ${catway.catwayNumber}`
      });
    }
    return res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: "server error" });
  }
};