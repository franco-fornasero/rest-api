const {coordKenobi, coordSkywalker, coordSato} = require('./constants');
const { requestWolfram, cleanResult } = require('../services/wolfram');


//En la función siempre me van a llegar 3 elementos, a pesar de que se puede obtener
//con solo 2. Yo necesito saber que distancia pertenece a cada coordenada, para armar las ecuaciones.
//Por eso GetLocation SIEMPRE recibe 3 elementos, y en un orden predeterminado que se da en ObtenerDistancias
//Si no tengo 1 de los datos, lo mando como -1 y lo ignoro, para respetar la firma que se pide.

const getLocation = async distances =>{
    let systemEquation = '';
    distances.forEach((element, i) => {
        if (element != -1){
            switch (i){
                case 0:
                    systemEquation = `${systemEquation} (${distances[0]})^2 = (x - ${coordKenobi.x})^2 + (y - ${coordKenobi.y})^2,`
                    break;
                case 1:
                    systemEquation = `${systemEquation} (${distances[1]})^2 = (x - ${coordSkywalker.x})^2 + (y - ${coordSkywalker.y})^2,`
                    break;
                case 2:
                    systemEquation = `${systemEquation} (${distances[2]})^2 = (x - ${coordSato.x})^2 + (y - ${coordSato.y})^2,`
                    break;
            }
        }
    });
    systemEquation = `{${systemEquation.substring(0, systemEquation.length - 1)}}`;
    const responseWolframJSON = await requestWolfram(systemEquation);
    const coordinates = cleanResult(responseWolframJSON);
    if (coordinates.length == 0){
        //Retorno false cuando el sistema no tiene una UNICA solución.
        //Puede tener 2 soluciones, pero no sabría cual es la que corresponde a la posición de la nave
        //En el caso que vengan 2 soluciones a.title es 'Solutions', entonces estaria descartando ese caso
        return false;
    }else {
        //Adapto los datos a la firma de la funcion
        let positions = [];
        coordinates.forEach( a => {
            let strings = a.split(", ");
            strings.forEach(b => {
                positions = [...positions, parseFloat(eval(b.substring(4)))];
            });
        });
        return positions;
    }
}

const getDistances = content => {
    //Filtrat las distancias de la request y enviarlas en un orden predeterminado
    let distances = [-1, -1, -1];
    content.satellites.forEach(satellite => {
        satellite.name = satellite.name.toLowerCase()
        switch (satellite.name){
            case 'kenobi':
                distances[0] = satellite.distance;
                break;
            case 'skywalker':
                distances[1] = satellite.distance;
                break;
            case 'sato':
                distances[2] = satellite.distance;
                break;
        }
    });

    return distances;    
}

module.exports = {
    getLocation,
    getDistances
}