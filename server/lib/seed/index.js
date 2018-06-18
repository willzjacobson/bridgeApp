'use strict';

const {
  Campaign,
  Class,
  Question,
  QuestionInstance,
  sequelize,
} = require('../db');

const campaigns = require('./Campaign');
const classes = require('./Class');
const questions = require('./Question');
const questionInstances = require('./QuestionInstance');

(async function seed() {
  try {
    await sequelize.sync();
    console.log('db synced');
    // await sequelize.sync({ force: true });
    // console.log('tables dropped');
    await sequelize.truncate({ cascade: true });
    console.log('db truncated');

    const [
      question1,
      question2,
      question3,
      question4,
    ] = await Question.bulkCreate(questions, {
      returning: true,
    });
    const [campaign1, campaign2] = await Campaign.bulkCreate(campaigns, {
      returning: true,
    });
    const [class1, class2, class3, class4] = await Class.bulkCreate(classes, {
      returning: true,
    });

    await class1.addCampaign(campaign1);
    await class2.addCampaign(campaign1);
    await class3.addCampaigns([campaign1, campaign2]);
    await class4.addCampaign(campaign2);
    await campaign1.addClasses([class1, class2, class3]);
    await campaign2.addClasses([class3, class4]);

    const [instance1] = await QuestionInstance.bulkCreate(
      [
        Object.assign({}, questionInstances[0], {
          CampaignId: campaign1.id,
          QuestionId: question1.id,
        }),
        Object.assign({}, questionInstances[1], {
          CampaignId: campaign1.id,
          QuestionId: question2.id,
        }),
        Object.assign({}, questionInstances[2], {
          CampaignId: campaign2.id,
          QuestionId: question3.id,
        }),
        Object.assign({}, questionInstances[3], {
          CampaignId: campaign2.id,
          QuestionId: question4.id,
        }),
      ],
      { returning: true },
    );

    const theInstance = await QuestionInstance.findById(instance1.id, {
      include: [Campaign, Question],
    });
    const theCampaign = await Campaign.findById(campaign1.id, {
      include: [Class, QuestionInstance],
    });

    console.log('Seed complete!');
    process.exit();
  } catch (err) {
    console.log('Seed Fail:', err);
  }
})();
