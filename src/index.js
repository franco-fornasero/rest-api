const express = require('express');

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
    const sistemaEcuaciones = `{
                                    ${distances[0]}^2 = (x - ${coordKenobi.x})^2 +%2B+ (y - ${coordKenobi.y})^2,
                                    ${distances[1]}^2 = (x - ${coordSkywalker.x})^2 +%2B+ (y - ${coordSkywalker.y})^2,
                                    ${distances[2]}^2 = (x - ${coordSato.x})^2 +%2B+ (y - ${coordSato.y})^2
                                }`;


    const reqWolfram = `https://api.wolframalpha.com/v2/query?input=${sistemaEcuaciones}&format=plaintext&output=JSON&appid=HWHT7U-7QKUET5T4K`;
    const responseWolfram = await fetch(reqWolfram);
    const responseWolframJSON = await responseWolfram.json();

    return responseWolframJSON;
}


