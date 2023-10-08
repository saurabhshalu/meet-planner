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
  google: {
    access_token: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    expiry_date: {
      type: Date,
    },
  },
  microsoft: {
    access_token: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    expiry_date: {
      type: Date,
    },
  },
  customURL: {
    type: String,
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
