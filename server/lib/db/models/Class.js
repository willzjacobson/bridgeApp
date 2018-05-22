'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../_db');

const Class = sequelize.define('Class', {
  admins: {
    // May be automatically included via Associations
    type: Sequelize.STRING,
    get: function() {
      return JSON.parse(this.getDataValue('admins'));
    },
    set: function(val) {
      return this.setDataValue('admins', JSON.stringify(val));
    },
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Class.findBy = (params = {}) => {
  return Class.findAll({
    where: params,
  });
};

module.exports = Class;

// admins: [userId] hasMany relationship?
