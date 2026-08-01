const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// GET all todos
router.get("/", verifyToken, getTodos);

// POST new todo
router.post("/", verifyToken, addTodo);

// UPDATE todo
router.put("/:id", verifyToken, updateTodo);

// DELETE todo
router.delete("/:id", verifyToken, deleteTodo);

module.exports = router;