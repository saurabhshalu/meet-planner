const router = require("express").Router();
const passport = require("passport");
const { fetchUserByEmail, insertUserDetails } = require("../helper/user");
const { sendEmail, generatePassword } = require("../helper/helper");
const userModel = require("../models/userModel");
const emailVerification = require("../models/emailVerification");
const md5 = require("md5");

const CLIENT_URL = "http://localhost:5173/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "not logged in..." });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/calendar.events.freebusy",
      "https://www.googleapis.com/auth/calendar.events",
    ],
  })
);

router.get("/google/callback", async (req, res) => {
  console.log("req.query=>", req.query);
  res.redirect(`${CLIENT_URL}`);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/microsoft",
  passport.authenticate("microsoft", { prompt: "select_account" })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.post("/local/registration", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email.trim() || !password.trim() || !displayName.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide valid details" });
    }
    //const user = await fetchUserByEmail(email);
    const user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist." });
    }

    const hashedPassword = md5(password);
    console.log("PASS->", password, hashedPassword);

    const newUser = userModel({
      displayName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      //send otp

      const otp = generatePassword(6, "1234567890");

      const myEmailOTP = emailVerification({ email, otp });
      await myEmailOTP.save();

      const emailSent = await sendEmail({
        email,
        subjectLine: "Registration for MeetPlanner - OTP",
        bodyHtml: `<h3>This is your OTP: ${otp}</h3>`,
      });

      if (!emailSent) {
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP, but account created, please login.",
        });
      }

      return res
        .status(201)
        .json({ success: true, otpSent: emailSent, message: "OTP Sent" });
    } else {
      return res.status(500).json({
        success: false,
        message: "Somethinge went wrong, please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
});

router.post("/local/otp/validate", async (req, res) => {
  try {
    console.log(req.body.email, req.body.otp);
    const myOTP = await emailVerification.findOne({
      email: req.body.email,
      // otp: req.body.otp,x
    });
    console.log("myOTP=>", myOTP);
    if (myOTP) {
      if (myOTP.otp !== req.body.otp) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid OTP1" });
      }
      const myUser = await userModel.findOne({ email: req.body.email });
      myUser.isVerified = true;
      await myUser.save();
      return res
        .status(200)
        .json({ success: true, message: "Account verified successfully." });
    }
    return res.status(400).json({ success: false, message: "Invalid OTP2" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "Invalid OTP3" });
  }
});

module.exports = router;
