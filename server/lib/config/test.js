module.exports = {
  port: process.env.PORT || 3001,
  dbConfig: {
    uri: 'postgres://localhost:5432/bridge',
  },
  auth0: {
    DOMAIN: 'https://bridge-app.auth0.com',
    CLIENT_ID: 'FIYkgU8mXTUaVUHx0ZYqELBjnkO7Njs1',
    CLIENT_SECRET:
      'CqyNiF9Wi_D2iQLHTbA_ybriaSVdfbx1BadiHyQkvovNKSU3dCCQ4zd2yHUD-zHY',
  },
};
