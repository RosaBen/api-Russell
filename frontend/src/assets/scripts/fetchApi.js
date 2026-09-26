const API_URL = "http://localhost:3000/api";

/**
 * Create a user
 *
 * @export
 * @async
 * @param {FormData} user 
 * @returns {Promise} 
 */
export async function createUser (user) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error("unable to create user");
  }

  return response.json();
}

/**
 * get all users
 *
 * @export
 * @async
 * @returns {Promise} 
 */
export async function getAllUsers () {
  const response = await fetch(`${API_URL}/users`, {
    method: "get",
    credentials: "include"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}