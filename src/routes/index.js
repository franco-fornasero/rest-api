const express = require('express');
const router = express.Router();

const topSecretRoutes = require('./topsecret');
const topSecretRoutesSplit= require('./topsecret_split');

router.use('/topsecret', topSecretRoutes);
router.use('/topsecret_split', topSecretRoutesSplit);


module.exports = router;