const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  googleOauth: {
    type: String,
    default: null,
  },
  microsoftOauth: {
    type: String,
  },
  customURL: {
    type: String,
    unique: true,
  },
  timezone: {
    tyep: String,
  },
  minimumMeetingDuration: {
    type: Number,
    default: 30,
    enum: [30, 60],
  },
  timeslots: [
    {
      day: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4, 5, 6],
      },
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
