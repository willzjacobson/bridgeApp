'use strict';

const Promise = require('bluebird');

const { sequelize } = require('./db');

(async function kickOff() {
  try {
    await sequelize.sync();
    console.log('DB Synced!');

    require('./server');
    console.log('Bridge Server Up and Running');
  } catch (err) {
    console.log('Error Starting Bridge Server', err);

    // Try again after 5 seconds
    await Promise.delay(5000);
    kickOff();
  }
})();
