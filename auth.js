const passport = require("passport");
const LocalStratgy = require("passport-local").Strategy;
const User = require("./models/user");

passport.use(
  new LocalStratgy(async (USERNAME, password, done) => {
    try {
      //console.log("User Credentials received:", USERNAME, password);
      const user = await User.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Invalid Username" });
      const isPassMatch = await user.comparePassword(password);
      if (isPassMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
