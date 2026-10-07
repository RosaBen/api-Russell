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
    credentials: "include",
    cache: "no-store"
  });

  const data = await response.json();
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
    credentials: "include",
    cache: "no-store"
  });

  const data = await response.json();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return data;
}

/**
 * Create a booking
 *
 * @export
 * @async
 * @param {catwayNumber}catwayNumber
 * @param {FormData} booking 
 * @returns {Promise} 
 */
export async function createBooking (booking, catwayNumber) {
  const response = await fetch(`${API_URL}/catways/${catwayNumber}/reservations`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(booking)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}