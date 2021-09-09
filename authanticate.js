const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./modals/user");
exports.local = passport.use(new LocalStrategy(User.authenticate()));

// we can use sessions or token. if we use session we need to apply serialization and deserialization method.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
