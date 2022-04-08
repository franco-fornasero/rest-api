const fetch = require('node-fetch');

const coordKenobi = {
    'x':'-500',
    'y':'-200'
};
const coordSkywalker = {
    'x':'100',
    'y':'-100'
};
const coordSato = {
    'x':'500',
    'y':'100'
};

//En la función siempre me van a llegar 3 elementos, a pesar de que se puede obtener
//con solo 2. Yo necesito saber que distancia pertenece a cada coordenada, para armar las ecuaciones.
//Por eso GetLocation SIEMPRE recibe 3 elementos, y en un orden predeterminado que se da en ObtenerDistancias
//Si no tengo 1 de los datos, lo mando vacío y lo ignoro, para respetar la firma que se pide.

async function GetLocation(distances){
    let sistemaEcuaciones = '';
    distances.forEach((element, i) => {
        if (element != -1){
            switch (i){
                case 0:
                    sistemaEcuaciones = `${sistemaEcuaciones} (${distances[0]})^2 = (x - ${coordKenobi.x})^2 + (y - ${coordKenobi.y})^2,`
                    break;
                case 1:
                    sistemaEcuaciones = `${sistemaEcuaciones} (${distances[1]})^2 = (x - ${coordSkywalker.x})^2 + (y - ${coordSkywalker.y})^2,`
                    break;
                case 2:
                    sistemaEcuaciones = `${sistemaEcuaciones} (${distances[2]})^2 = (x - ${coordSato.x})^2 + (y - ${coordSato.y})^2,`
                    break;
            }
        }
    });
    sistemaEcuaciones = `{${sistemaEcuaciones.substring(0, sistemaEcuaciones.length - 1)}}`;
    const sistemaEcuacionesURL = encodeURIComponent(sistemaEcuaciones);
    const reqWolfram = `https://api.wolframalpha.com/v2/query?input=${sistemaEcuacionesURL}&format=plaintext&includepodid=Solution&output=JSON&appid=HWHT7U-7QKUET5T4K`;
    const responseWolfram = await fetch(reqWolfram);
    const responseWolframJSON = await responseWolfram.json();
    console.log(responseWolframJSON.queryresult.pods[0]);

    let coordenadas = []
    if (queryresult.pods){
        responseWolframJSON.queryresult.pods.forEach(a => {
            if (a.title == 'Solution' && a.id == 'Solution'){
                a.subpods.forEach(b => {
                    coordenadas = [...coordenadas, b.plaintext];
                });
                //return coordenadas;
            }
        });
    }
    if (coordenadas.length == 0){
        return false;
    }else {
        let posiciones = [];
        coordenadas.forEach( a => {
            let cadenas = a.split(", ");
            cadenas.forEach(b => {
                posiciones = [...posiciones, parseFloat(eval(b.substring(4)))];
            });
        });
        return posiciones;
    }
}

function obtenerDistancias(content){
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
    GetLocation,
    obtenerDistancias
}