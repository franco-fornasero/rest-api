const express = require('express');
const { GetLocation, obtenerDistancias } = require('../controllers/GetLocation');
const { GetMessage, obtenerMensajes} = require('../controllers/GetMessage')
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const file = require('../data/satellites.json')


router.get('/topsecret_split', jsonParser,async (req, res) => {
    
    res.send(file);
});



module.exports = router;