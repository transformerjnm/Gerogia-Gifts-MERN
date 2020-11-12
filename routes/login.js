const express = require('express');
const LoginRouter = express.Router();
const passport = require('passport');

LoginRouter.route('/')
.post((req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json({"body": "No User Exists"});
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.json({ "body": "Successfully Authenticated"});
          });
        }
      })(req, res, next);
});

module.exports = LoginRouter;