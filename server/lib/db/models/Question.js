'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../_db');

const Question = sequelize.define('Question', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: Sequelize.ENUM('freeform', 'multiple', 'emoji'),
    defaultValue: 'freeform',
  },
  answers: {
    type: Sequelize.STRING,
    get: function() {
      return JSON.parse(this.getDataValue('answers'));
    },
    set: function(val) {
      return this.setDataValue('answers', JSON.stringify(val));
    },
  },
});

Question.findBy = (params = {}) => {
  return Question.findAll({
    where: params,
  });
};

module.exports = Question;
