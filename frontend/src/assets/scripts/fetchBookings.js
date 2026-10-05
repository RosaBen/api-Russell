const API_URL = "http://localhost:3000/api";


// Bookings


/**
 * get all bookings
 *
 * @export
 * @async
 * @returns {Promise} 
 */
export async function getAllBookings () {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "get",
    credentials: "include"
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return data;
}

/**
 * get a reservation with a catwayNumber
 *
 * @export
 * @param {catwayNumber}catwayNumber
 * @param {id} _id
 * @async
 * @returns {Promise} 
 */
export async function getBooking (catwayNumber, id) {
  const response = await fetch(`${API_URL}/catways/${catwayNumber}/reservations/${id}
    `, {
    method: "get",
    credentials: "include"
  });

  const data = await response.json();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return data;
}