const router = require("express").Router();
const passport = require("passport");
const { fetchUserByEmail, insertUserDetails } = require("../helper/user");
const { sendEmail } = require("../helper/helper");
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

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

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
    const user = await fetchUserByEmail(email);

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist." });
    }

    const newUser = await insertUserDetails({
      email,
      password,
      displayName,
      provider: "local",
    });

    if (newUser) {
      //send otp

      const emailSent = await sendEmail({
        email,
        subjectLine: "Your OTP",
        bodyHtml: "<h1>This is your OTP: 6666</h1>",
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

module.exports = router;
