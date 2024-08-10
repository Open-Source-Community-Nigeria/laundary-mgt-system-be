const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      throw new Error("Not Authenticated!");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Not Authorized!");
    }

    req.user = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { requireAuth };
