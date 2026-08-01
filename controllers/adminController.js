const pool = require("../config/db");

// ======================
// Admin Dashboard
// ======================
const getDashboard = async (req, res) => {
  try {
    // Total Users
    const totalUsers = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    // Total Todos
    const totalTodos = await pool.query(
      "SELECT COUNT(*) FROM todos"
    );

    // Completed Todos
    const completedTodos = await pool.query(
      "SELECT COUNT(*) FROM todos WHERE completed = true"
    );

    // Pending Todos
    const pendingTodos = await pool.query(
      "SELECT COUNT(*) FROM todos WHERE completed = false"
    );

    res.json({
      totalUsers: parseInt(totalUsers.rows[0].count),
      totalTodos: parseInt(totalTodos.rows[0].count),
      completedTodos: parseInt(completedTodos.rows[0].count),
      pendingTodos: parseInt(pendingTodos.rows[0].count),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ======================
// Get All Users
// ======================
const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, name, email, role FROM users ORDER BY id ASC"
    );

    res.json(users.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ======================
// Delete User
// ======================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Do not allow deleting an admin
    if (user.rows[0].role === "admin") {
      return res.status(400).json({
        message: "Admin cannot be deleted",
      });
    }

    // Delete the user
    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

    res.json({
      message: "User Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// ======================
// Get All Todos
// ======================
const getAllTodos = async (req, res) => {
  try {
    const todos = await pool.query(`
      SELECT
        todos.id,
        todos.title,
        todos.completed,
        todos.task_date,
        users.id AS user_id,
        users.name,
        users.email
      FROM todos
      JOIN users
        ON todos.user_id = users.id
      ORDER BY todos.id ASC
    `);

    res.json(todos.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// ======================
// Delete Any Todo
// ======================
const deleteAnyTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if todo exists
    const todo = await pool.query(
      "SELECT * FROM todos WHERE id = $1",
      [id]
    );

    if (todo.rows.length === 0) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Delete the todo
    await pool.query(
      "DELETE FROM todos WHERE id = $1",
      [id]
    );

    res.json({
      message: "Todo Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  getDashboard,
  getAllUsers,
  deleteUser,
  getAllTodos,
   deleteAnyTodo
};