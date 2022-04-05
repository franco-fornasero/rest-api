function GetMessage(messages){
    const min = Math.min(messages[0].length, messages[1].length, messages[2].length)
    let corte = false;
    let c = 1;
    let msg = [];
    while(corte == false){
        let cadenas = [
            messages[0][messages[0].length - c],
            messages[1][messages[1].length - c],
            messages[2][messages[2].length - c]
        ]
        const palabra = retornarNoVacia(cadenas);
        if (palabra == ''){
            corte = true;
        }
        else{
            if (c == min){
                corte = true
            }
            else {
                c++;
            }
            msg = [...msg, palabra];
          
        }  
    }

    msg = msg.reverse();
    let cadena = '';
    msg.forEach((element, i) => {
        i == msg.length - 1 ? cadena+= `${element}` : cadena+= `${element} `
    });

   return cadena; 
}

function retornarNoVacia(cadenas){
    let palabra = ''
    cadenas.forEach(mensaje => {
       if (mensaje != ''){
           palabra = mensaje; 
       }
    });
    return palabra;
}

function obtenerMensajes(content){
    let messages = content.satellites.map(satellite => {
        return satellite.message;
    });
    return messages;
}

module.exports = {
    GetMessage,
    obtenerMensajes 
}