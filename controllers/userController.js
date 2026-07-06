const pool = require("../config/db");

const getUser = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getUser,
};