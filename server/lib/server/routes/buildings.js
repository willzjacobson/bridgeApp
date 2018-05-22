'use strict';

const router = require('express').Router();
const proj4 = require('proj4');

const { Buildings } = require('../../db');
const {
  communication: { getNearestZipcodes },
  helpers: { getDistanceBetween },
} = require('../../modules');

proj4.defs(
  'EPSG:2263',
  '+proj=lcc +lat_1=41.03333333333333 +lat_2=40.66666666666666 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000.0000000001 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs',
);

// 655 Madison is: 40.764516, -73.970647
router.get('/near', async (req, res, next) => {
  let { lat, lng } = req.query;
  lat = Number(lat);
  lng = Number(lng);
  const [x1, y1] = proj4('WGS84', 'EPSG:2263', [lng, lat]);

  try {
    const zipCodes = await getNearestZipcodes(lat, lng);
    let buildings = await Buildings.findAllWithinZips(zipCodes);

    // Add distance from given location to building object
    buildings = buildings.map(b => {
      b.distance = getDistanceBetween(x1, y1, b.xCoord, b.yCoord); // x1, y1, x2, y2
      return b;
    });

    // Sort in ascending distance from user
    buildings.sort((a, b) => a.distance - b.distance);
    const closestTen = buildings.slice(0, 10);

    res.status(200).json(closestTen);
  } catch (err) {
    next(err);
  }
});

router.use('/:address', (req, res, next) => {
  Buildings.findByAddress(req.params.address)
    .then(building => {
      if (building) {
        req.building = building[0];
        next();
      } else next();
    })
    .catch(next);
});

router.get('/:address', (req, res, next) => {
  if (req.building) res.status(200).json(req.building);
  else res.status(404).send('Building not found');
});

module.exports = router;
