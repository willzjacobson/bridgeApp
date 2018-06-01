'use strict';

const router = require('express').Router();

const { QuestionInstance } = require('../../db');

router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  QuestionInstance.findAll({ where: { student: userId } })
    .then((questionInstances = []) => questionInstances.map(q => q.get()))
    .then(questionInstances => res.status(200).json(questionInstances))
    .catch(next);
});

router.post('/', (req, res, next) => {
  QuestionInstance.create(req.body, { returning: true })
    .then(question => res.status(201).json(question.get()))
    .catch(next);
});

module.exports = router;
