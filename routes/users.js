const express = require("express");
const User = require("../modals/user");
const passport = require("passport");
const authenticate = require("../authanticate");
// passport-local-mongoose provides methods for registring (signup) and login users.

const router = express.Router();

/* GET users listing. */
router.get("/", authenticate.verifyUser, function (req, res, next) {
  User.find()
    .then((users) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(users);
    })
    .catch((err) => next(err));
});

router.post("/signup", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        err.statusCode = 500; //internal server error
        res.setHeader("Content-type", "application/json");
        res.json({ err: err });
      } else {
        // authenticate return a function as a second argument wich has req,res and (callback F)
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((err) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-type", "application/json");
            res.json({ err: err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json");
            res.json({ success: true, statue: "Registration Successful!" });
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "Your are Successfully logged in",
  });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("You are not logged in!");
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
