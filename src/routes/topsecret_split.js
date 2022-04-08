const express = require('express');
const fs = require('fs');
const { GetLocation, obtenerDistancias } = require('../controllers/GetLocation');
const { GetMessage, obtenerMensajes } = require('../controllers/GetMessage');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.post('/topsecret_split/:satellite', jsonParser, (req, res) => {
    const file = require('../data/satellites.json');
    const {satellite} = req.params;
    if (satellite == 'kenobi' || satellite == 'skywalker' || satellite == 'sato'){
        let content = req.body;
        //Chequeo si el satelite ya está cargado en el arhivo json
        let existe = false;
        file.forEach(reg => {
            if (reg.name == satellite){
                reg.message = content.message;
                reg.distance = content.distance;
                existe = true;
            }
        });
        //Si no está cargado, lo agrego
        if (existe == false){
            content["name"] = satellite;
            file.push(content);
        }
        //Sobreescribo el archivo con los nuevos datos
        fs.writeFile('src/data/satellites.json', JSON.stringify(file, null, 4), (err) => {
            if (err) 
                throw err;
            else 
                console.log('Archivo guardado');
        });
        res.statusCode = 200;
    }
    else {
        res.statusCode = 400;
    }
    res.send();
});

router.get('/topsecret_split/', async (req, res) => {
    const file = require('../data/satellites.json');
    let response;
     // Si no tengo satélites o solo tengo 1 es imposible determinar la posición.
    if (file.length < 2){
        res.statusCode = 400;
        response = 'No se puede determinar la posición y/o el mensaje con la información disponible';
    } 
    else {
        const satellites = require('../data/satellites.json');
        const satellitesJSON = {satellites}
        const mensajes = obtenerMensajes(satellitesJSON);
        const mensaje = GetMessage(mensajes);
        //Controlo esto acá porque me parece mejor cortar la ejecución antes de hacer la request a la api
        if (mensaje == false){
            res.statusCode = 400;
            response = 'No se puede determinar la posición y/o el mensaje con la información disponible';
        } 
        else {
            const distancias = obtenerDistancias(satellitesJSON);
            const posiciones = await GetLocation(distancias);
            if (posiciones == false){
                res.statusCode = 400;
                response = 'No se puede determinar la posición y/o el mensaje con la información disponible';
            }
            else {
                res.statuscode
                response = {
                    "position": {
                        "x": posiciones[0],
                        "y": posiciones[1]
                    },
                    "message":mensaje
                }
            }
        }
        
    }
    
    res.send(response);

});

module.exports = router;