'use strict';

const Sequelize = require('sequelize');

const {
  dbConfig: { uri },
} = require('../config');

let sequelize;

if (!sequelize) {
  sequelize = new Sequelize(uri, { logging: false });
}

module.exports = sequelize;
