const express = require('express');
const { GetLocation, obtenerDistancias } = require('../controllers/GetLocation');
const { GetMessage, obtenerMensajes} = require('../controllers/GetMessage')
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


router.post('/topsecret', jsonParser,async (req, res) => {
    content = req.body;
    distancias = obtenerDistancias(content);
    mensajes = obtenerMensajes(content);
    const mensaje = GetMessage(mensajes);
    const posiciones = await GetLocation(distancias);
    let response;
    if (posiciones == 'NoSolutions' ){
        res.statusCode = 400;
        response = 'RESPONSE CODE: 404'
    }
    else {
        response = {
            "position": {
                "x":`${posiciones[0]}`,
                "y": `${posiciones[1]}`
            },
            "message":mensaje
        }
    }
    
    res.send(response);
});



module.exports = router;