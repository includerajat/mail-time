const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const signAccessToken = async (userId) => {
  return await jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
      issuer: "rajat@include.com",
    }
  );
};

const validateSignAccessToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    error.status = 401;
    error.message = "Unauthorized";
    next(error);
  }
};

module.exports = {
  signAccessToken,
  validateSignAccessToken,
};
