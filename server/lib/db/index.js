'use strict';

const sequelize = require('./_db');

const { Campaign, Class, Question, QuestionInstance } = require('./models');

// Define Sequelize Associations
QuestionInstance.belongsTo(Question, {
  onDelete: 'cascade',
});

Campaign.hasMany(QuestionInstance);
QuestionInstance.belongsTo(Campaign, {
  onDelete: 'cascade',
});

Class.belongsToMany(Campaign, {
  through: 'ClassCampaigns',
});
Campaign.belongsToMany(Class, {
  through: 'ClassCampaigns',
});

module.exports = {
  sequelize,
  Question,
  Class,
  QuestionInstance,
  Campaign,
};

/*

users (User and Permissions Stored on Auth0)
  email
  user_metadata
    organization
    first
    last
    classes [ObjectId strings] (only if student)
questions (unalterable by users)
  text
  type
  answers
question_instances
  join between an assigner user, an assignee user, and a question
  can be free-form answer or multiple choice (emoji, numerical scale, enum strings)
    question: ObjectId
    campaign: ObjectId
    admins: [userId] (teacher)
    student: userId (student in class)
    answer: text
    submitted: bool
    anonymous: bool
Campaign (when a campaign is created, so is a question instance for each question for each member of the class)
  admins: [userId] (teacher)
  classes: [ObjectId]
  completed: bool
  dueDate: Date
Class
  admins: [userId]
Report
  Just a view of a completed campaign
    view by question (filter out other questions)
    or view by student (filter out other students)

*/
