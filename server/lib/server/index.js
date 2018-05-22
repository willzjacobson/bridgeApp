'use strict';

const app = require('express')();
const http = require('http').Server(app);

const { port } = require('../config');

// Initialize body/xml parsing middleware
require('./middleware')(app);

// Initialize routing middleware
app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err);
});

http.listen(port, () =>
  console.log(`The server is listening closely on port ${port}...`),
);

module.exports = http;
