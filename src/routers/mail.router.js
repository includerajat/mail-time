const express = require("express");

const MailController = require("../controllers/mail.controller");
const { validateSignAccessToken } = require("../helpers/jwt_helper");

const router = express.Router();

router.post("/mail", validateSignAccessToken, MailController.createMail);

router.get("/mail", validateSignAccessToken, MailController.allMails);

router.get("/schedule", MailController.sendAllScheduleType);

module.exports = router;
