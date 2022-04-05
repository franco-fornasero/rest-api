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

async function GetLocation(distances){
    const sistemaEcuaciones = `{(${distances[0]})^2 = (x - ${coordKenobi.x})^2 + (y - ${coordKenobi.y})^2,(${distances[1]})^2 = (x - ${coordSkywalker.x})^2 + (y - ${coordSkywalker.y})^2, (${distances[2]})^2 = (x - ${coordSato.x})^2 + (y - ${coordSato.y})^2}`;
    const sistemaEcuacionesURL = encodeURIComponent(sistemaEcuaciones);
    const reqWolfram = `https://api.wolframalpha.com/v2/query?input=${sistemaEcuacionesURL}&format=plaintext&output=JSON&appid=HWHT7U-7QKUET5T4K`;
    const responseWolfram = await fetch(reqWolfram);
    const responseWolframJSON = await responseWolfram.json();
    let coordenadas = []
    responseWolframJSON.queryresult.pods.forEach(a => {
        if (a.title == 'Solution' && a.id == 'Solution'){
            a.subpods.forEach(b => {
                coordenadas = [...coordenadas, b.plaintext];
            });
            return coordenadas;
        }
    });
    if (coordenadas == []){
        return "NoSolutions"
    }else {
        coordenadas.forEach( a => {
            let cadenas = a.split(",");
            posiciones = cadenas.map(b => {
                return parseFloat(b.substring(5));
            });
        })
        return posiciones;
    }
}

function obtenerDistancias(content){
    let distances = [];
    content.satellites.forEach(satellite => {
        distances = [...distances, satellite.distance];
    });
    return distances;    
}

module.exports = {
    GetLocation,
    obtenerDistancias
}