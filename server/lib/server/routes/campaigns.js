'use strict';

const router = require('express').Router();

const { Campaign } = require('../../db');

router.get('/', (req, res, next) => {
  Campaign.findAll({ raw: true })
    .then((campaigns = []) => res.status(200).json(campaigns))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Campaign.create(req.body, { returning: true })
    .then(campaign => res.status(201).json(campaign.get()))
    .catch(next);
});

module.exports = router;
