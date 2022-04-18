const express = require('express');
const { getLocation, getDistances, checkBody } = require('../controllers/locations');
const { getMessage, getMessages } = require('../controllers/messages');
const { buildResponse } = require('../controllers/middlewares');
const router = express.Router();

router.use(checkBody);
router.use(getDistances);
router.use(getMessages);
router.use(getMessage);
router.use(getLocation);

router.post('/', buildResponse)

module.exports = router;