const mongoose = require("mongoose");

const emailVerificationSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  at: {
    type: Date,
    default: Date.now,
    expires: 3600 * 24, //second //TODO: change it to 1 day
  },
});

const emailVerification = mongoose.model(
  "emailVerification",
  emailVerificationSchema
);

module.exports = emailVerification;
