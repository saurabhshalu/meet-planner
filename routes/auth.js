const router = require("express").Router();
const passport = require("passport");
const { fetchUserByEmail, insertUserDetails } = require("../helper/user");
const { sendEmail, generatePassword } = require("../helper/helper");
const userModel = require("../models/userModel");
const emailVerification = require("../models/emailVerification");
const md5 = require("md5");
const axios = require("axios");
const CLIENT_URL = "http://localhost:5173/";

const { google } = require("googleapis");
const {
  defaultScope,
  getGoogleAccountFromCode,
} = require("../helper/google-util");
const OAuth2 = google.auth.OAuth2;

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
    scope: defaultScope,
    accessType: "offline",
  })
);

router.get("/google/callback", async (req, res) => {
  // console.log("req.query=>", req.query);
  const { code, scope } = req.query;

  try {
    if (!code) {
      throw new Error("Code not found.");
    }

    getGoogleAccountFromCode(code, async (err, userInfo) => {
      if (err) {
        console.log("err=======>", err);
        res.redirect(`${CLIENT_URL}?success=false`);
      } else {
        if (userInfo.refresh_token) {
          const myUser = await userModel.findOne({ email: userInfo.email });
          myUser.google = {
            access_token: userInfo.accessToken,
            refresh_token: userInfo.refresh_token,
            expiry_date: userInfo.expiry_date,
          };

          await myUser.save();
        }
        res.redirect(`${CLIENT_URL}?success=true`);
      }
    });
  } catch (error) {
    console.log(error);
    res.redirect(CLIENT_URL);
  }
});

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
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }
      const myUser = await userModel.findOne({ email: req.body.email });
      myUser.isVerified = true;
      await myUser.save();
      return res
        .status(200)
        .json({ success: true, message: "Account verified successfully." });
    }
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

router.post(
  "/local/login",
  passport.authenticate("local", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "http://localhost:5173",
  })
);

router.post("/local/loginme", async (req, res) => {
  try {
    const myUser = await userModel.findOne({ email: req.body.email });
    console.log("myUser--->", myUser);

    if (!myUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password invalid." });
    }
    if (myUser.password !== md5(req.body.password)) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password invalid." });
    }
    return res.status(200).json({
      success: true,
      message: { displayName: myUser.displayName, email: myUser.email },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Email or password invalid." });
  }
});

module.exports = router;
