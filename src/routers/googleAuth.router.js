const express = require("express");
const passport = require("passport");
const createError = require("http-errors");
// const User = require("../database/models/user");
const { signAccessToken } = require("../helpers/jwt_helper");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  function (req, res) {
    res.redirect(process.env.URI);
  }
);

router.get("/current_user", async (req, res, next) => {
  try {
    if (!req.user) {
      throw createError.Unauthorized();
    }
    const accessToken = await signAccessToken(req.user._id);
    return res.send({
      accessToken,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    req.logout();
    res.send({
      message: "Successful logout",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
