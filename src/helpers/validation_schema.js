const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().min(4).max(40).lowercase().required(),
  password: Joi.string().required(),
});

const signinSchema = Joi.object({
  username: Joi.string().min(4).max(40).lowercase().required(),
  password: Joi.string().required(),
});

const mailSchema = Joi.object({
  to: Joi.string().email().lowercase().required(),
  cc: Joi.string().email().lowercase().required(),
  subject: Joi.string().required(),
  body: Joi.string().required(),
  schedule: Joi.required(),
  howManyTime: Joi.number().integer().min(0).max(3).required(),
  startTime: Joi.date().required(),
});

module.exports = {
  signupSchema,
  signinSchema,
  mailSchema,
};
