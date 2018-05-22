'use strict';

const env = process.env.NODE_ENV;

module.exports =
  env === 'production' ? require('./production') : require('./test');
