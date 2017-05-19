const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const index = require('./routes/index');
const movies = require('./routes/movies');
const task = require('./tasks/getMovies');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/', index);
//app.use('/movies', movies);
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

