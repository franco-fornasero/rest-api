const express = require('express');
const { GetLocation, getDistances } = require('../controllers/GetLocation');
const { GetMessage, obtenerMensajes} = require('../controllers/GetMessage');
const router = express.Router();


router.post('/', async (req, res) => {
    const content = req.body;
    //Verificar si viene bien el body

    const { satellites } = content;
    //Se podrian usar como middlewares 
    const distancias = getDistances(satellites);
    const mensajes = obtenerMensajes(content);
    const mensaje = GetMessage(mensajes);
    const posiciones = await GetLocation(distancias);

    // Esto tambien se podria enviar como un middleware
    let response;
    if (posiciones == false || mensaje == false){
        //Revisar que se setea codigo 400 y respues el response se pone como 404.
        // No aporta mucho poner lo mismo que ya tiene el status code . Ademas, res.send tiene sobrecarga para setear status code y response.
        // Revisar que no se esta respondiendo un json sino un texto plano.
        res.statusCode = 400;
        response = 'RESPONSE CODE: 404';
    }
    else {   
        response = {
            "position": {
                "x": posiciones[0],
                "y": posiciones[1]
            },
            "message":mensaje
            
        }
        res.statusCode = 200;
    }
    
    res.send(response);
});

module.exports = router;