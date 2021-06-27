const User = require("../models/user.model");
const createError = require("http-errors");

const { signupSchema, signinSchema } = require("../helpers/validation_schema");
const { signAccessToken } = require("../helpers/jwt_helper");

const signup = async (req, res, next) => {
  try {
    const result = await signupSchema.validateAsync(req.body);

    const doesExist = await User.findOne({
      username: result.username,
    });
    if (doesExist) {
      throw createError.Conflict(
        `${result.username} username already taken . Please choose different username`
      );
    }
    const user = new User(result);
    const savedUser = await user.save();
    savedUser.password = null;
    const accessToken = await signAccessToken(savedUser.id);
    return res.send({
      accessToken,
      user: savedUser,
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinSchema.validateAsync(req.body);
    const user = await User.findOne({
      username: result.username,
    });
    if (!user)
      throw createError.NotFound("User with username is not registered");
    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch)
      throw createError.Unauthorized("Username/Password doesn't match.");
    const accessToken = await signAccessToken(user.id);
    user.password = null;
    return res.send({
      accessToken,
      user: user,
    });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Username and Password"));
    next(error);
  }
};

const validateToken = async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await User.findById(userId);
    if (!user) {
      throw createError.Unauthorized("User not found");
    }
    const accessToken = await signAccessToken(user._id);
    return res.send({
      accessToken,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  validateToken,
};
