const express = require('express');
const fs = require('fs');
const { getLocation, getDistances } = require('../controllers/locations');
const { getMessage, getMessages } = require('../controllers/messages');
const router = express.Router();
const file = require('../data/satellites.json');

router.post('/:satellite', (req, res) => {
    const {satellite} = req.params;
    if (satellite == 'kenobi' || satellite == 'skywalker' || satellite == 'sato'){
        let content = req.body;
        //Chequeo si el satelite ya está cargado en el arhivo json
        let exists = false;
        file.forEach(reg => {
            if (reg.name == satellite){
                reg.message = content.message;
                reg.distance = content.distance;
                exists = true;
            }
        });
        //Si no está cargado, lo agrego
        if (exists == false){
            content["name"] = satellite;
            file.push(content);
        }
        //Sobreescribo el archivo con los nuevos datos
        //TODO -> Verificar que pasa cuando hay un error al escribir el archivo
        fs.writeFile('src/data/satellites.json', JSON.stringify(file, null, 4), (err) => {
            if (err) 
                throw err;
            else 
            //TODO -> morgan para log
                console.log('Archivo guardado');
        });
        res.status(200);
    }
    else {
        res.status(400);
    }
    res.send();
});

router.get('/', async (req, res) => {
    let response;
     // Si no tengo satélites o solo tengo 1 es imposible determinar la posición.
    if (file.length < 2){
        res.statusCode = 400;
        response = 'No se puede determinar la posición y/o el mensaje con la información disponible';
    } 
    else {
        const satellites = require('../data/satellites.json');
        const satellitesJSON = {satellites}
        const mensajes = getMessages(satellitesJSON);
        const mensaje = getMessage(mensajes);
        //Controlo esto acá porque me parece mejor cortar la ejecución antes de hacer la request a la api
        if (mensaje == false){
            res.statusCode = 400;
            response = 'No se puede determinar la posición y/o el mensaje con la información disponible';
        } 
        else {
            const distancias = getDistances(satellitesJSON);
            const posiciones = await getLocation(distancias);
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