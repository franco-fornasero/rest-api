const { names } = require('./constants');
const fs = require('fs');
const file = require('../data/satellites.json');

const checkBody = (req, res, next) => {
    let satellitesName = names;
    let { satellites } = req.body;
    if (satellites && satellites.length == 3) {
        for (let i = 0; i < req.body.satellites.length; i++) {
            if (satellites[i].message && satellites[i].name && satellites[i].distance) {
                if (satellitesName.includes(satellites[i].name.toLowerCase())) {
                    satellitesName = satellitesName.filter(name => {
                        return name != satellites[i].name.toLowerCase();
                    });
                }
                else {
                    return res.sendStatus(400)
                }
            }
            else {
                return res.sendStatus(400)
            }
        }
    }
    else {
        return res.sendStatus(400)
    }
    next();
}

const buildResponse = (req, res) => {
    const { positions, msg } = req;
    let response = '';
    if (req.positions == false || req.msg == false) {
        if (req.split) {
            response = 'No se puede determinar la posición y/o el mensaje con la información disponible';
            return res.status(400).send(response);
        }
        else {
            return res.sendStatus(400);
        }
    }
    else {
        response = {
            "position": {
                "x": positions[0],
                "y": positions[1]
            },
            "message": msg

        }
        res.status(200);
        res.json(response);
    }
}

const checkName = (req, res, next) => {
    const { satellite } = req.params;
    if (names.includes(satellite)) {
        next();
    }
    else {
        res.status(400);
        res.send();
    }
}

const updateFile = (req, res, next) => {
    let content = req.body, exists = false;
    const { satellite } = req.params;
    //Chequeo si el satelite ya está cargado en el arhivo json
    file.forEach( reg => {
        if (reg.name == satellite) {
            reg.message = content.message;
            reg.distance = content.distance;
            exists = true;
        }
    })
    //Si no está cargado, lo agrego
    if (exists == false){
        content["name"] = satellite;
        file.push(content);
    }
    fs.writeFile('src/data/satellites.json', JSON.stringify(file, null, 4), (err) => {
        if (err) {
            //TODO -> está bien el code 500?
            return res.sendStatus(500);
        }
        else {
            //TODO -> morgan para log?
            console.log('Archivo guardado');
            return res.sendStatus(200);
        }
    });

}


const quantyOfSatellites = (req, res, next) => {
    if (file.length < 2) {
        res.statusCode = 400;
        response = 'No se puede determinar la posición y/o el mensaje con la información disponible';
        return res.send(response);
    }
    else {
        req.satellites = file;
        next();
    }
}

const buildBody = (req, res, next) => {
    satellites = file;
    req.body = { satellites };
    // flag para determinar diferenciar cuando llamo al buildResponse desde el topsecret_split
    // ya que tengo que retornar un mensaje de error en ese caso
    req.split = true;
    next();
}

module.exports = {
    checkBody,
    buildResponse,
    checkName,
    updateFile,
    quantyOfSatellites,
    buildBody
};