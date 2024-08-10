const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// database connection
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "laundry-management-db",
    // bufferCommands: false,
    // connectTimeoutMS: 30000,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Create corsOptions object with your desired configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // Set the allowed origin
  methods: "GET,POST,DELETE,PUT", // Set the allowed HTTP methods
  optionsSuccessStatus: 200, // Set the status code for successful preflight requests
};

// Pass corsOptions to the CORS middleware
app.use(cors(corsOptions));

app.use("/", require("./routes/auth.routes"));

// client
app.use("/", require("./routes/clients.routes"));

const PORT = 9000;
app.listen(PORT, () => console.log(`Server is starting on port ${PORT}`));

app.use(errorHandler);

module.exports = app;
