const express = require('express');
const querystring = require("querystring");
const morgan = require('morgan');
const fetch = require('node-fetch');

const app = express();
// settings 
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// routes
//app.use(require('./routes/index'));
app.post('/api/topsecret', async (req, res) => {
    content = req.body;
    
    // faltan chequear que los datos estén bien
   
    limpiarRequest(content);
    const jsonwaolf = await GetLocation(distances);
    await res.send(jsonwaolf);

    
});
// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${3000}`);
});

let distances = [];
function limpiarRequest(content){
    content.satellites.forEach(satellite => {
        distances = [...distances, satellite.distance];
    });
    //console.log(distances);
    
}


coordKenobi = {
                'x':'-500',
                'y':'-200'
            };
coordSkywalker = {
                'x':'100',
                'y':'-100'
            };
coordSato = {
                'x':'500',
                'y':'100'
            };


async function GetLocation(distances){
    const sistemaEcuaciones = `{(${distances[0]})^2 = (x - ${coordKenobi.x})^2 + (y - ${coordKenobi.y})^2,(${distances[1]})^2 = (x - ${coordSkywalker.x})^2 + (y - ${coordSkywalker.y})^2, (${distances[2]})^2 = (x - ${coordSato.x})^2 + (y - ${coordSato.y})^2}`;
    //console.log(sistemaEcuaciones);
    const sistemaEcuacionesURL = encodeURIComponent(sistemaEcuaciones);
    //console.log(sistemaEcuacionesURL);
    const reqWolfram = `https://api.wolframalpha.com/v2/query?input=${sistemaEcuacionesURL}&format=plaintext&output=JSON&appid=HWHT7U-7QKUET5T4K`;
    const responseWolfram = await fetch(reqWolfram);
    const responseWolframJSON = await responseWolfram.json();
    let coordenadas = []
    responseWolframJSON.queryresult.pods.forEach(a => {
        //console.log(a.title, a.id);
        if (a.title == 'Solution' && a.id == 'Solution'){
            a.subpods.forEach(b => {
                coordenadas = [...coordenadas, b.plaintext];
            });
            //console.log(resultado);
            return coordenadas;
        }
    });
    if (coordenadas == []){
        return "NoSolutions"
    }else {
        coordenadas.forEach( a => {
            let cadenas = a.split(",");
            //console.log(cadenas);
            posiciones = cadenas.map(b => {
                return parseFloat(b.substring(5));
            });
            
            console.log(posiciones);
        })
        return posiciones;
    }
}


