const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schedulerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  second: {
    type: Boolean,
    default: false,
  },
  day: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Boolean,
    default: false,
  },
  month: {
    type: Boolean,
    default: false,
  },
});

const Scheduler = mongoose.model("Scheduler", schedulerSchema);

module.exports = Scheduler;
