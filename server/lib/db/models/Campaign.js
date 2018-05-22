'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../_db');

const Campaign = sequelize.define('Campaign', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  admins: {
    type: Sequelize.STRING,
    get: function() {
      return JSON.parse(this.getDataValue('admins'));
    },
    set: function(val) {
      return this.setDataValue('admins', JSON.stringify(val));
    },
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

Campaign.findBy = (params = {}) => {
  return Campaign.findAll({
    where: params,
  });
};

module.exports = Campaign;

// Campaign (when a campaign is created, so is a question instance for each question for each member of the class)
//   admins: [userId] (teacher)
//   classes: [ObjectId]
//   completed: bool
//   dueDate: Date
