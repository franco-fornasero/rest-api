const express = require('express');
const fs = require('fs');
const { GetLocation, obtenerDistancias } = require('../controllers/GetLocation');
const { GetMessage, obtenerMensajes} = require('../controllers/GetMessage');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//const { response } = require('../app');

router.post('/topsecret_split/:satellite', jsonParser, (req, res) => {
    const file = require('../data/satellites.json');
    const {satellite} = req.params;
    if (satellite == 'kenobi' || satellite == 'skywalker' || satellite == 'sato'){
        let content = req.body;
        let existe = false;
        file.forEach(reg => {
            if (reg.satellite == satellite){
                reg.message = content.message;
                reg.distance = content.distance;
                existe = true;
            }
        });
        if (existe == false){
            content["satellite"] = satellite;
            file.push(content);
        }
        fs.writeFile('src/data/satellites.json', JSON.stringify(file, null, 4), (err) => {
            if (err) 
                throw err;
            else 
                console.log('Archivo guardado');
        });
        response = 'Datos guardados';
        res.statusCode = 200;
    }
    else {
        response = 'Error: Datos incorrectos';
        res.statusCode = 400;
    }
    res.send(response);
});


router.get('/topsecret_split/',async (req, res) => {
    // Si no tengo satélites o solo tengo 1 es imposible determinar la posición.
    if (file.length < 2){
        res.send('No se puede determinar la posición y/o el mensaje con los datos disponibles')
    } 
    else {
        const satellites = require('../data/satellites.json');
        const satellitesJSON = {satellites};
        const mensajes = obtenerMensajes(satellitesJSON);
        const mensaje = GetMessage(mensajes);

    }
    

    
    file.forEach(a => {
        a.satellite = satellite;
        res.json(a);
    })

});

module.exports = router;