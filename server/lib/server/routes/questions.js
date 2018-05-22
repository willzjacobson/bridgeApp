'use strict';

const router = require('express').Router();

const { Question } = require('../../db');

router.get('/', (req, res, next) => {
  Question.findAll({ raw: true })
    .then((questions = []) => res.status(200).json(questions))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Question.create(req.body, { returning: true })
    .then(question => res.status(201).json(question.get()))
    .catch(next);
});

module.exports = router;
