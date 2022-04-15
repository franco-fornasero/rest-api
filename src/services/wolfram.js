const fetch = require('node-fetch');

const requestWolfram = async systemEquation => {
    const systemEquationURL = encodeURIComponent(systemEquation);
    const reqWolfram = `https://api.wolframalpha.com/v2/query?input=${systemEquationURL}&format=plaintext&includepodid=Solution&output=JSON&appid=HWHT7U-7QKUET5T4K`;
    const responseWolfram = await fetch(reqWolfram);
    const responseWolframJSON = await responseWolfram.json();
    return responseWolframJSON;
}

const cleanResult = responseWolframJSON => {
    let coordenadas = [];
    responseWolframJSON.queryresult.pods.forEach(a => {
        if (a.title == 'Solution' && a.id == 'Solution'){
            a.subpods.forEach(b => {
                coordenadas = [...coordenadas, b.plaintext];
            });
        }
    });
    return coordenadas;
    
}

module.exports = {
    requestWolfram,
    cleanResult
}
