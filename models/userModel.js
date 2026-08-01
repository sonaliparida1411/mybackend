const pool = require("../config/db");

// Create a new user
const createUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, "user"]
  );

  return result.rows[0];
};

// Find user by email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};