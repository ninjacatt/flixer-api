const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const User = require('../models/User');

passport.use(new BasicStrategy(
  (email, password, callback) => {
    User.findOne({ email }, (err, user) => {
      if (err) { return callback(err); }

      // If we couldnt find the user
      if (!user) { return callback(null, false); }

      // Return user if we find a match password
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return callback(err); }
        if (!isMatch) { return callback(null, false); }
        return callback(null, user);
      });
    });
  }
));

exports.basic = passport.authenticate('basic', { session: false });
