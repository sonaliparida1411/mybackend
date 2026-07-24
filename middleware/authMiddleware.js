const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from request header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No Token Provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;