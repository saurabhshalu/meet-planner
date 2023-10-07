const express = require("express");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
require("https").globalAgent.options.rejectUnauthorized = false;
dotenv.config({});

const passportSetup = require("./passport");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./routes/auth");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.use("/auth", authRoute);

app.listen(
  process.env.PORT,
  console.log(`Server started on PORT: ${process.env.PORT}`)
);
