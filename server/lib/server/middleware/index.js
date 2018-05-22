'use strict';

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://bridge-app.auth0.com/.well-known/jwks.json',
  }),
  audience: 'http://localhost:3001',
  issuer: 'https://bridge-app.auth0.com/',
  algorithms: ['RS256'],
});

module.exports = app => {
  app.use(bodyParser.json({ strict: false }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(jwtCheck);
};
