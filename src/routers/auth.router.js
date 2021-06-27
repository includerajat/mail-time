const express = require("express");
const router = express.Router();
const Scheduler = require("../models/scheduler.model");
const { validateSignAccessToken } = require("../helpers/jwt_helper");

const AuthController = require("../controllers/auth.controller");

router.post("/signup", AuthController.signup);

router.post("/signin", AuthController.signin);

router.get("/validate", validateSignAccessToken, AuthController.validateToken);

router.post("/schedule", async (req, res) => {
  const schedule = new Scheduler({
    name: req.body.name,
    second: req.body.second,
    day: req.body.day,
    time: req.body.time,
    month: req.body.month,
    date: req.body.date,
  });
  const saveSchedule = await schedule.save();
  return res.send({ saveSchedule });
});

module.exports = router;
