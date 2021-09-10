const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./modals/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; // provides helper methods to extract token from req.
const jwt = require("jsonwebtoken"); // create sign and verify tokens.

const config = require("./config");

exports.local = passport.use(new LocalStrategy(User.authenticate()));

// we can use sessions or token. if we use session we need to apply serialization and deserialization method.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

const opts = {}; // jwt strategy oprions.
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // send token in header as bearer token.
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload:", jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
