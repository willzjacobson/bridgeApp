'use strict';

const router = require('express').Router();

const { Reports } = require('../../db');

let io;
const initializeIO = () => {
  if (io) return io;
  io = require('../../io')();
};

router.use('/:reportId', (req, res, next) => {
  Reports.findById(req.params.reportId)
    .then(report => {
      if (report) {
        req.report = report;
        next();
      } else next();
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Reports.findAll({ raw: true })
    .then((reports = []) => res.status(200).json(reports))
    .catch(next);
});

router.post('/', (req, res, next) => {
  initializeIO();
  let newReport;

  Reports.create(req.body, { returning: true })
    .then(report => {
      newReport = report.get();
      res.status(201).json(newReport);
    })
    .then(() => io.emit('create', newReport))
    .catch(next);
});

router.get('/:reportId', (req, res, next) => {
  if (req.report) res.status(200).json(req.report);
  else res.status(404).send('Report not found');
});

router.put('/:reportId', (req, res, next) => {
  initializeIO();
  if (!req.report) res.status(404).send('Report not found');
  const report = req.report.get();
  // Build fresh update object (rather than put user input straight into the DB)
  const update = {};
  for (let key in req.body) {
    if (report.hasOwnProperty(key)) {
      update[key] = req.body[key];
    }
  }

  let updatedReport;

  req.report
    .update(update, { returning: true })
    .then(report => {
      updatedReport = report.get();
      return res.status(201).json(updatedReport);
    })
    .then(() =>
      io.emit('update', { id: updatedReport.id, status: updatedReport.status }),
    )
    .catch(next);
});

router.delete('/:reportId', (req, res, next) => {
  initializeIO();
  if (!req.report) res.status(404).json('Report not found.');
  const id = req.params.reportId;
  req.report
    .destroy()
    .then(() => res.status(204).send(`Report ${id} deleted.`))
    .then(() => io.emit('delete', id))
    .catch(next);
});

module.exports = router;
