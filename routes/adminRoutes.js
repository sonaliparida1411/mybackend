const express = require("express");
const {
  getDashboard,
  getAllUsers,
  deleteUser,
   getAllTodos,
   deleteAnyTodo,
} = require("../controllers/adminController");

const authMiddleware = require("../middlewares/verifyToken");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.json({
    message: "Admin Route Working Successfully",
  });
});

// Admin Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboard
);

// View All Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);
router.get(
  "/todos",
  authMiddleware,
  adminMiddleware,
  getAllTodos
);

// Delete User
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);
// Delete Any Todo
router.delete(
  "/todos/:id",
  authMiddleware,
  adminMiddleware,
  deleteAnyTodo
);
module.exports = router;