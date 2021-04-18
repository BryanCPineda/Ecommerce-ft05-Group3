const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
require("dotenv").config();

//Setting up Twitter Stategy with passport
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWIT_ID,
      consumerSecret: process.env.TWIT_SECRET,
      callbackURL: "http://localhost:4000/twitter/callback",
      includeEmail: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
