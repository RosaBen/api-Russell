const API_URL = "http://localhost:3000/api";


// USERS
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

/**
 * get a user by email
 *
 * @export
 * @param {email}
 * @async
 * @returns {Promise} 
 */
export async function getUser (email) {
  const response = await fetch(`${API_URL}/users/${email}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

/**
 * edit a user 
 *
 * @export
 * @param {email, userdata}
 * @async
 * @returns {Promise} 
 */
export async function editUser (email, user) {
  const response = await fetch(`${API_URL}/users/${email}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error("unable to edit user");
  }

  return response.json();
}

/**
 * delete a user 
 *
 * @export
 * @param {email}
 * @async
 * @returns {Promise} 
 */
export async function deleteUser (email) {
  const response = await fetch(`${API_URL}/users/${email}`, {
    method: "delete",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("unable to delete user");
  }

  return response.json();
}

// CATWAYS

/**
 * Create a catway
 *
 * @export
 * @async
 * @param {FormData} catway 
 * @returns {Promise} 
 */
export async function createCatway (catway) {
  const response = await fetch(`${API_URL}/catways`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(catway)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

/**
 * get all catways
 *
 * @export
 * @async
 * @returns {Promise} 
 */
export async function getAllCatways () {
  const response = await fetch(`${API_URL}/catways`, {
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

/**
 * get a catway with catwayNumber
 *
 * @export
 * @param {catwayNumber}catwayNumber
 * @async
 * @returns {Promise} 
 */
export async function getCatway (catwayNumber) {
  const response = await fetch(`${API_URL}/catways/${catwayNumber}`, {
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

/**
 * edit a catway
 *
 * @export
 * @param {catwayNumber, catwaydata}
 * @async
 * @returns {Promise} 
 */
export async function EditCatway (catwayNumber, catway) {
  const response = await fetch(`${API_URL}/catways/${catwayNumber}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(catway)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}