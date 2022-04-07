const express = require('express');
const { GetLocation, obtenerDistancias } = require('../controllers/GetLocation');
const { GetMessage, obtenerMensajes} = require('../controllers/GetMessage')
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()


router.post('/topsecret', jsonParser,async (req, res) => {
    const content = req.body;
    const distancias = obtenerDistancias(content);
    const mensajes = obtenerMensajes(content);
    const mensaje =GetMessage(mensajes);
    const posiciones = await GetLocation(distancias);
    let response;
    if (posiciones == 'NoSolutions' || mensaje == false){
        res.statusCode = 400;
        response = 'RESPONSE CODE: 404'
    }
    else {
        if (posiciones.length > 2){
            position1 = {
                "x": posiciones[0],
                "y": posiciones[1]
            };
            position2 = {
                "x": posiciones[2],
                "y": posiciones[3]
            };
            response = {
                position1,
                position2,
                "message":mensaje
            }
        }else{
            response = {
                "position": {
                    "x": posiciones[0],
                    "y": posiciones[1]
                },
                "message":mensaje
            }
        }
        
        
        res.statusCode = 200;
    }
    
    res.send(response);
});



module.exports = router;