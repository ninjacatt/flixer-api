// Contain actions which control the flow of data into and from our database
const User = require('../models/User');

// Find user by ID
exports.find_user_by_id = (req, res, next) => {
  User.findById(req.params.id)
    .exec(function (err, user) {
      if (err) { return next(err); }
      //Successful, return back the user data
      res.send(user);
    });
};

// Save user
exports.save_user = (req, res) => {
  req.checkBody('first_name', 'First name must be specified.').notEmpty();
  req.checkBody('last_name', 'Last name must be specified.').notEmpty();
  req.checkBody('email', 'email must be specified.').notEmpty();
  req.checkBody('password', 'password must be specified.').notEmpty();

  req.sanitize('first_name').escape();
  req.sanitize('last_name').escape();
  req.sanitize('first_name').trim();
  req.sanitize('last_name').trim();
  req.sanitize('email').escape();
  req.sanitize('email').trim();

  const errors = req.validationErrors();

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });

  if (errors) {
    return res.status(400).send(errors);
  } else {
    user.save((err) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate username
          return res.status(500).send({ success: false, message: 'User already exist!' });
        }
        // Some other error
        return res.status(500).send(err);
      }
      res.setHeader('Location', `/user/${user.id})`);
      return res.status(201).send(user);
    });
  }
};

// Delete user
exports.delete_user = (req, res) => {
  res.send('NOT IMPLEMENTED');
};
