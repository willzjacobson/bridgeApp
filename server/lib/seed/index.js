'use strict';

const {
  Campaign,
  Class,
  Question,
  QuestionInstance,
  sequelize,
} = require('../db');

// const campaigns = require('./Campaign');
// const classes = require('./Class');
// const questions = require('./Question');
// const questionInstances = require('./QuestionInstance');

(async function seed() {
  try {
    // await sequelize.sync();
    // await sequelize.sync({ force: true });
    await sequelize.truncate({ cascade: true });

    const [question1, question2] = await Question.bulkCreate(
      [{ text: 'question1' }, { text: 'question2' }],
      {
        returning: true,
      },
    );

    const [campaign1, campaign2] = await Campaign.bulkCreate(
      [
        {
          admins: ['teacher1', 'teacher2'],
          dueDate: new Date(),
        },
        {
          admins: ['teacher1', 'teacher2'],
          dueDate: new Date(),
        },
      ],
      { returning: true },
    );
    const [class1, class2] = await Class.bulkCreate(
      [
        { admins: ['teacher1', 'teacher2'], name: 'class1' },
        { admins: ['teacher1', 'teacher2'], name: 'class2' },
      ],
      { returning: true },
    );
    await class1.addCampaign(campaign1);
    await class2.addCampaigns([campaign1, campaign2]);

    const [instance1, instance2] = await QuestionInstance.bulkCreate(
      [
        {
          admins: ['teacherId1'],
          student: ['studentId1'],
          CampaignId: campaign1.id,
          QuestionId: question1.id,
        },
        {
          admins: ['teacherId1'],
          student: ['studentId2'],
          CampaignId: campaign1.id,
          QuestionId: question2.id,
        },
      ],
      { returning: true },
    );

    // console.log('TEST', (await campaign1.getQuestionInstances()).length);
    // console.log('TEST2', (await instance1.getCampaign()).get());
    // console.log('TEST3', (await instance1.getQuestion()).get());

    const i = await QuestionInstance.findById(instance1.id, {
      include: [Campaign, Question],
    });
    // console.log('III', i.get());

    const c = await Campaign.findById(campaign1.id, {
      include: [Class, QuestionInstance],
    });
    console.log('CCC', c.get());

    console.log('Seed complete!');
  } catch (err) {
    console.log('Seed Fail:', err);
  }
})();
