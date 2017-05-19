const schedule = require('node-schedule');
const urls = require('../resources/urls.json');

function collectMoviesData() {
  try {
    for (const link in urls) {
      if (urls.hasOwnProperty(link)) {
        console.log(link + ": " + urls[link]);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

function getMoviesTask() {
  console.log('Start get movies task');
  collectMoviesData();
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  rule.hour = 23;
  //rule.minute = new schedule.Range(0, 59, 1); // every 1 minute

  schedule.scheduleJob(rule, () => {
    console.log('Execute scheduled job!');
  });
}

module.exports.getMoviesTask = getMoviesTask;

