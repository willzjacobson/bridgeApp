'use strict';

const auth0API = require('../../utils/auth0API');

const jwtAuthz = require('express-jwt-authz');
const router = require('express').Router();

router.get('/questions', jwtAuthz(['read:questions']), (req, res) => {
  const questions = [{ tesk: 'You good?' }, { text: 'Cool. Why?' }];
  res.status(200).json(questions);
});

router.get('/newts', jwtAuthz(['read:newts']), (req, res) => {
  const questions = [{ color: 'red' }, { color: 'pokadotted' }];
  res.status(200).json(questions);
});

router.get('/orgasms', jwtAuthz(['read:orgasms']), (req, res) => {
  const orgasms = [
    { duration: 'short', strength: 'strong' },
    { duration: 'long', strength: 'mild' },
  ];
  res.status(200).json(orgasms);
});

router.get('/users', jwtAuthz(['read:users']), async (req, res) => {
  try {
    const users = await auth0API.getUsers();
    console.log('users?', users);
    res.status(200).json(users);
  } catch (err) {
    console.log('err', err);
    res.status(500).send(err);
  }
});

router.use('/questionInstances', require('./questionInstances'));
router.use('/campaigns', require('./campaigns'));

module.exports = router;
