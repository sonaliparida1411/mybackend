const pool = require("../config/db");

// Get logged-in user's todos
const getTodos = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Add new todo
const addTodo = async (req, res) => {
  try {
    const { title, task_date } = req.body;

    const result = await pool.query(
      "INSERT INTO todos(title, task_date, user_id) VALUES($1, $2, $3) RETURNING *",
      [title, task_date, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed, task_date } = req.body;

    const result = await pool.query(
      `UPDATE todos
       SET title=$1, completed=$2, task_date=$3
       WHERE id=$4 AND user_id=$5
       RETURNING *`,
      [title, completed, task_date, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Todo deleted successfully"
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};