const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

const app = express();
const index = require('./routes/index');
const user = require('./routes/User');
const task = require('./tasks/GetMovies');

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoDb = process.env.MONGO_DB || 'flixer-api';
const mongoCredentials = (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) ? `${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@` : '';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongoCredentials}${mongoHost}:${mongoPort}/${mongoDb}`);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(expressValidator()); // Add this after the bodyParser middleware!

app.use('/', index);
//app.use('/movies', movie);
app.use('/user', user);

// Scheduled tasks
task.getMoviesTask();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error middleware
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, () => {
  console.log('Flixer listening on port 3000!');
});

