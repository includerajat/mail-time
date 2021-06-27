const mongoose = require("mongoose");
const schedule = require("node-schedule");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const Schedule = require("../models/scheduler.model");
const { sendMail } = require("./send_mail");

const mapPropertyWithSchedule = async (id) => {
  try {
    const schedule = await Schedule.findById(id);
    const property = [];
    if (schedule.second === true) property.push("second");
    if (schedule.day === true) property.push("day");
    if (schedule.time === true) property.push("time");
    if (schedule.month === true) property.push("month");
    if (schedule.date === true) property.push("date");
    return property;
  } catch (error) {
    if (error instanceof mongoose.CastError)
      return createError.BadRequest("Invalid schedule");
    return error;
  }
};

const generateCronExpression = (givenTime) => {
  const { second, day, time, month, date } = givenTime;
  // second = second % 60;
  // day = day % 7;
  // let [hour, minute] = time.split(":");
  // hour = hour % 24;
  // minute = minute % 60;
  // month = month % 13;
  // date = date % 32;
  const expression = `${second ? "*/" + second + " " : ""}${
    time ? time.split(":")[1] : "*"
  } ${time ? time.split(":")[0] : "*"} ${date ? date : "*"} ${
    month ? month : "*"
  } ${day ? day : "*"}`;
  return expression;
};

// console.log(
//   generateCronExpression({
//     time: "14:50",
//     month: "8",
//   })
// );

const scheduleMail = async (
  cronExp,
  time,
  date,
  email,
  subject,
  body,
  cc,
  username
) => {
  const randomString = await uuidv4();
  const jobName = randomString;
  // console.log(date);
  schedule.scheduleJob(date, () => {
    schedule.scheduleJob(jobName, cronExp, async () => {
      console.log("I run");
      const result = await sendMail(email, subject, body, cc, username);
      // console.log(result);
      time = time - 1;
      if (time < 1) {
        console.log(jobName, "END JOB");
        schedule.cancelJob(jobName);
      }
    });
  });
};

module.exports = {
  mapPropertyWithSchedule,
  generateCronExpression,
  scheduleMail,
};
