import Reservation from "../models/Reservation.js";


/**
 * Get all reservations
 *
 * @async
 * @route GET/reservations/reservations
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

/**
 * Get a reservation by id
 *
 * @async
 * @route GET/reservation/:id
 * @param {id} _id
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Private
 */
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      res.status(404).json({ message: "reservation not found" });
    }
    return res.status(200).json(reservation);

  } catch (error) {
    console.error(error);
    return res.status(501).json({
      message: "server error"
    });
  }
};