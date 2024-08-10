const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

// Test Endpoint
const test = (req, res) => {
  res.json("UnAuthorized Access");
};

// Get Profile
const getProfile = (req, res) => {
  res.json({
    message: "Authorized",
    status: 200,
    // userId: user._id,
  });
};

module.exports = {
  test,
  getProfile,
};
