const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
const User = require("../models/User"); // Import the User model
require("dotenv").config(); // Load environment variables

module.exports = async (req, res, next) => {
  try {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.send(error(401, "Authorization header is required"));
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req._id = decoded._id;
    console.log("inside require user");

    const user = await User.findById(req._id);
    if (!user) {
      return res.send(error(404, "User not found"));
    }

    next();
  } catch (e) {
    console.error(e);
    return res.send(error(401, "Invalid access key"));
  }
};
