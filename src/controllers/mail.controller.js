const createError = require("http-errors");
const User = require("../models/user.model");
const Mail = require("../models/email.model");
const Scheduler = require("../models/scheduler.model");
const { mailSchema } = require("../helpers/validation_schema");
const {
  mapPropertyWithSchedule,
  scheduleMail,
  generateCronExpression,
} = require("../helpers/schedule_helper");

const createMail = async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await User.findById(userId);
    if (!user) {
      throw createError.Unauthorized("User not found");
    }
    const { username } = user;
    if (isNaN(new Date(req.body.startTime))) {
      throw createError.BadRequest("Please Provide Right Date");
    }
    const result = await mailSchema.validateAsync(req.body);
    result.owner = userId;
    const property = await mapPropertyWithSchedule(req.body.schedule.id);
    const scheduleData = {};
    property.forEach((p) => (scheduleData[p] = req.body.schedule[p]));
    const cronExpression = generateCronExpression(scheduleData);
    scheduleMail(
      cronExpression,
      result.howManyTime,
      result.startTime,
      result.to,
      result.subject,
      result.body,
      result.cc,
      username
    );
    const mail = new Mail(result);
    const savedMail = await mail.save();
    res.send({
      mail: savedMail,
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 400;
    next(error);
  }
};

const allMails = async (req, res, next) => {
  try {
    const { userId } = req.payload;
    let user = await User.findById(userId);
    if (!user) {
      throw createError.Unauthorized("User not found");
    }
    const mails = await Mail.find({
      owner: userId,
    });
    res.send({ mails: mails });
  } catch (error) {
    next(error);
  }
};

const sendAllScheduleType = async (req, res, next) => {
  try {
    const schedules = await Scheduler.find({});
    res.send(schedules);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMail,
  allMails,
  sendAllScheduleType,
};
