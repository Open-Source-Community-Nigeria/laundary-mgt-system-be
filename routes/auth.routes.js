const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const cros = require("cors");
const { test, getProfile } = require("../controllers/auth.controllers");
const {
  registerUser,
  loginUser,
  userList,
  getUser,
} = require("../controllers/user.controllers");

router.get("/", test);
// Login $ register
router.post("/auth/register", registerUser);
router.get("/auth/list", userList);
router.get("/auth/get/:id", getUser);
router.post("/auth/login", loginUser);
// profile
router.get("/profile", requireAuth, getProfile);

module.exports = router;
