const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailSchema = new Schema({
  to: {
    type: String,
    required: true,
  },
  cc: {
    type: String,
    // required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  howManyTime: {
    type: Number,
    min: 1,
    max: 3,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
