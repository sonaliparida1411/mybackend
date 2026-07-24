const express = require("express");
const router = express.Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// GET Users
router.get("/user", getUser);

// POST User
router.post("/user", createUser);
// PUT User
router.put("/user/:id", updateUser);
// DELETE User
router.delete("/user/:id", deleteUser);

module.exports = router;