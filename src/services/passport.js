const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // done(null, id);
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.SERVER_ROOT_URI + "/api/auth/google/callback",
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const username = profile.emails[0].value;
      let user = await User.findOne({
        username,
      });
      if (user) {
        return cb(null, user);
      }
      user = new User({
        username,
      });
      user = await user.save();
      cb(null, user);
    }
  )
);
