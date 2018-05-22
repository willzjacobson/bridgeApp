const Sequelize = require('sequelize');

const {
  dbConfig: { uri },
} = require('../config');

const sequelize = new Sequelize(uri, { logging: false });

// const Class = sequelize.define('Class', { name: Sequelize.STRING });
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

// const Campaign = sequelize.define('Campaign', { title: Sequelize.STRING });
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

Class.belongsToMany(Campaign, {
  through: 'ClassCampaigns',
});
Campaign.belongsToMany(Class, {
  through: 'ClassCampaigns',
});

sequelize.sync({ force: true }).then(async () => {
  const campaign = await Campaign.create({
    admins: ['teacher1', 'teacher2'],
    dueDate: new Date(),
  });
  const class1 = await Class.create(
    { admins: ['teacher1', 'teacher2'], name: 'class1' },
    { returning: true },
  );
  const class2 = await Class.create(
    { admins: ['teacher1', 'teacher2'], name: 'class1' },
    { returning: true },
  );

  await class1.addCampaign(campaign);
  await class2.addCampaign(campaign);

  const campaigns = await class1.getCampaigns();
  const classes = await campaign.getClasses();
  console.log('campaigns:', campaigns.length, 'classes:', classes.length);
});
