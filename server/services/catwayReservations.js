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
 * @access Protected
 */
export const getCatwayReservations = async (req, res) => {
  try {
    const { id } = req.params;

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
 * @access Protected
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

/**
 * Regsiter a new reservation for teh selected Catway
 *
 * @async
 * @route POST/catways/:id/reservations
 * @param {id} catwayNumber
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export const createNewCatwayReservation = async (req, res) => {
  const { clientName, boatName, startDate, endDate } = req.body;
  try {
    const { id } = req.params;
    const catway = await findCatwayNumber(id);
    const existingReservation = await Reservation.findOne({ catwayNumber: catway.catwayNumber, startDate: { $lt: endDate }, endDate: { $gt: startDate } });
    if (existingReservation) {
      return res.status(400).json({
        message: `this catway ${catway.catwayNumber} is already booked for this timeperiod`
      });
    } else {
      const reservation = await Reservation.create({ catwayNumber: catway.catwayNumber, clientName, boatName, startDate, endDate });
      return res.status(201).json({
        message: "catway created",
        reservation: {
          id: reservation._id,
          catwayNumber: reservation.catwayNumber,
          clientName: reservation.clientName,
          boatName: reservation.boatName,
          startDate: reservation.startDate,
          endDate: reservation.endDate
        }
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: "server error" });
  }
};

/**
 * edit an existing reservation for the selected catway
 *
 * @async
 * @route PUT/catways/:id/reservations/:idReservation
 * @param {id} catwayNumber
 * @param {idReservation} reservation_id
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export const editExistingReservation = async (req, res) => {
  const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
  try {
    const { idReservation, id } = req.params;
    const catway = await findCatwayNumber(id);
    const reservation = await Reservation.findOne({
      _id: idReservation,
      catwayNumber: catway.catwayNumber
    });
    if (!reservation) {
      return res.status(404).json({
        message: "reservation not found"
      });
    }
    const nextCatwayNumber = Number(catwayNumber ?? reservation.catwayNumber);
    const nextStartDate = startDate ? new Date(startDate) : reservation.startDate;
    const nextEndDate = endDate ? new Date(endDate) : reservation.endDate;
    if (nextStartDate >= nextEndDate) {
      return res.status(400).json({
        message: "startdate must be before enddate"
      });
    }
    const conflict = await Reservation.findOne({
      _id: { $ne: reservation._id },
      catwayNumber: nextCatwayNumber,
      startDate: { $lt: nextEndDate },
      endDate: { $gt: nextStartDate }
    });

    if (conflict) {
      return res.status(400).json({
        message: `this catway ${catway.catwayNumber} is already booked for this timeperiod`
      });
    }

    reservation.catwayNumber = nextCatwayNumber;
    reservation.clientName = clientName ?? reservation.clientName;
    reservation.boatName = boatName ?? reservation.boatName;
    reservation.startDate = nextStartDate;
    reservation.endDate = nextEndDate;

    await reservation.save();
    return res.status(200).json({
      message: "reservation edited",
      reservation: {
        id: reservation._id,
        catwayNumber: reservation.catwayNumber,
        clientName: reservation.clientName,
        boatName: reservation.boatName,
        startDate: reservation.startDate,
        endDate: reservation.endDate
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: "server error" });
  }
};

/**
 * delete an existing reservation for the selected catway
 *
 * @async
 * @route DELETE/catways/:id/reservations/:idReservation
 * @param {id} catwayNumber
 * @param {idReservation} reservation_id
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export const deleteCatwayReservation = async (req, res) => {
  try {
    const { idReservation, id } = req.params;
    const catway = await findCatwayNumber(id);
    const reservation = await Reservation.findOneAndDelete({
      _id: idReservation,
      catwayNumber: catway.catwayNumber
    });
    if (!reservation) {
      return res.status(404).json({
        message: "reservation not found"
      });
    }

    return res.status(200).json({
      message: "reservation deleted"
    });

  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: "server error" });
  }
};