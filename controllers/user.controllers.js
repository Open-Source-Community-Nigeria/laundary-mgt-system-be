const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

// List Users
const userList = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json({ status: 200, data: users }))
    .catch((err) => res.status(400).json(err));
};

// Fetch User [One]
const getUser = (req, res) => {
  const id = req.params.id;
  User.find({ _id: id })
    .then((user) => res.status(200).json({ status: 200, data: user }))
    .catch((err) => res.status(400).json(err));
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, username, userImage, password } = req.body;
    // check if name was entered
    if (!name) {
      return res.status(400).json({
        status: 400,
        error: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: "Email is required",
      });
    }
    if (!username) {
      return res.status(400).json({
        status: 400,
        error: "Username is required",
      });
    }
    // check if password is good
    if (!password || password.length < 4) {
      return res.status(400).json({
        status: 400,
        error: "Password is required and it should be 4 characters long",
      });
    }
    // check email exist
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        status: 400,
        error: "Email Already Taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    // create user in db
    const user = await User.create({
      name,
      email,
      username,
      userImage:
        "https://firebasestorage.googleapis.com/v0/b/first-crud-f85ea.appspot.com/o/anasyakubu-cms-images%2Flogo.png?alt=media&token=24586ab7-bb29-4a6f-a59f-a6555854650a",
      password: hashedPassword,
      isPremuim: false,
    });
    // return res.status(201);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check Empty Field
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: "Email is required",
      });
    }
    // check if password is good
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: "Password is required",
      });
    }

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 400,
        error: "No User Found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      // throw new Error("Invalid credentials!");
      return res.status(400).json({
        status: 400,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10hr" }
    );

    return res.status(200).json({
      status: 200,
      message: "User logged in successfully!",
      token: token,
      userId: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      userImage: user.userImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  // User
  userList,
  getUser,
  registerUser,
  loginUser,
};
