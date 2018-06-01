'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../_db');

const QuestionInstance = sequelize.define(
  'QuestionInstance',
  {
    admins: {
      type: Sequelize.STRING,
      get() {
        return JSON.parse(this.getDataValue('admins'));
      },
      set(val) {
        return this.setDataValue('admins', JSON.stringify(val));
      },
      allowNull: false,
    },
    student: {
      // Reference to student it's assigned to
      type: Sequelize.STRING,
      allowNull: false,
    },
    answer: Sequelize.STRING, // how to store emoji?
    submitted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    anonymous: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // We don't store users in our DB, but we don't want have to to
    // do a O(n) lookup to get all QuestionInstance rows for a certain student.
    indexes: [
      {
        fields: ['student'],
      },
    ],
  },
);

QuestionInstance.findBy = (params = {}) => {
  return QuestionInstance.findAll({
    where: params,
  });
};

module.exports = QuestionInstance;

// question: ObjectId
// campaign: ObjectId

// admins: [userId] teacher
// student: userId
