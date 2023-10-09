const passport = require("passport");
const userModel = require("./models/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const md5 = require("md5");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      accessType: "offline",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("HELLO_Hello=>", refreshToken);
      done(null, profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);

passport.use(
  new MicrosoftStrategy(
    {
      clientID: MICROSOFT_CLIENT_ID,
      clientSecret: MICROSOFT_CLIENT_SECRET,
      callbackURL: "/auth/microsoft/callback",
      scope: ["openid", "email", "profile"],
      tenant: process.env.MICROSOFT_TENANT,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const myUser = await userModel.findOne({ email: username });
      console.log("myUser--->", myUser);

      if (!myUser) {
        return done(null, false);
      }
      if (myUser.password !== md5(password)) {
        return done(null, false);
      }
      return done(null, {
        displayName: myUser.displayName,
        email: myUser.email,
      });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
