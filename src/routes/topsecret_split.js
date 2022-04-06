const express = require('express');
const fs = require('fs');
const { GetLocation, obtenerDistancias } = require('../controllers/GetLocation');
const { GetMessage, obtenerMensajes} = require('../controllers/GetMessage');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const file = require('../data/satellites.json');

router.post('/topsecret_split/:satellite', jsonParser,async (req, res) => {
    const {satellite} = req.params;
    if (satellite == 'kenobi' || satellite == 'skywalker' || satellite == 'sato'){
        let content = req.body;
        file.forEach(reg => {
            if (reg.satellite == satellite){
                reg.message = content.satellite;
                reg.distance = content.distance;
            }
        })
        /*content["satellite"] = satellite;
        file.push(content);*/
        fs.writeFile('src/data/satellites.json', JSON.stringify(file), () =>  console.log('pa q quiere esto'));
        res.send('ok');
    }
    //res.json(file);
});

router.get('/topsecret_split/:satellite', jsonParser,async (req, res) => {
    res.send(file);
});

module.exports = router;