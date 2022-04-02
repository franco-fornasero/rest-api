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
app.post('/api/topsecret', async (req, res) => {
    content = req.body;
    // faltan chequear que los datos estén bien
    distancias = obtenerDistancias(content);
    mensajes = obtenerMensajes(content);
    getMessage(mensajes);
    //console.log(mensajes);
    const jsonwaolf = await GetLocation(distancias);
    await res.send(jsonwaolf);
});


// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${3000}`);
});


function obtenerDistancias(content){
    let distances = [];
    content.satellites.forEach(satellite => {
        distances = [...distances, satellite.distance];
    });
    return distances;    
}

function obtenerMensajes(content){
    let messages = content.satellites.map(satellite => {
        return satellite.message;
    });
    return messages;
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

function getMessage(messages){
    console.log('funcion');
    /*const min = Math.min(messages[0].length, messages[1].length, messages[2].length);
    const max = Math.max(messages[0].length, messages[1].length, messages[2].length);*/
    /*let iKenobi = messages[0].length;
    let iSkywalker = messages[1].length;
    let iSato = messages[2].length;*/
    let corte = false;
    let c = 1;
    let msg = '';
    while(corte == false){
        //break;
        let cadenas = [
            messages[0][messages[0].length - c],
            messages[1][messages[1].length - c],
            messages[2][messages[2].length - c]
        ]
        console.log(cadenas);
        const palabra = retornarNoVacia(cadenas);
        console.log(palabra);
        if (palabra == ''){
            corte = true;
        }
        else{
            if (c = messages[0].length){
                corte = true
            }
            else {
                c++;
                msg+= ` ${palabra}`; 
            }
          
        }  
    }
    console.log(msg);
    
}

function retornarNoVacia(cadenas){
    let palabra = ''
    //map devuelve un array, arreglar
    palabra = cadenas.map(mensaje => {
       if (mensaje != ''){
           return mensaje;
       }
    });
    return palabra;
}
