const express = require('express');
const { getLocation, getDistances } = require('../controllers/locations');
const { getMessage, getMessages } = require('../controllers/messages');
const { checkName, updateFile, quantyOfSatellites, buildBody,buildResponse } = require('../controllers/middlewares')
const router = express.Router();

router.post('/:satellite', checkName, updateFile)

router.use(quantyOfSatellites);
router.use(buildBody);
router.use(getMessages);
router.use(getMessage);
router.use(getDistances);
router.use(getLocation);

router.get('/', buildResponse)

module.exports = router;