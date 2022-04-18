const express = require('express');
const { getLocation, getDistances } = require('../controllers/locations');
const { getMessage, getMessages } = require('../controllers/messages');
const { buildResponse, checkBody } = require('../controllers/middlewares');
const router = express.Router();

router.use(checkBody);
router.use(getDistances);
router.use(getMessages);
router.use(getMessage);
router.use(getLocation);

router.post('/', buildResponse)

module.exports = router;