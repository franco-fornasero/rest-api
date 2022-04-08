/* Supongo que puede darse el caso de que todos los satelites que estoy controlando tengan desface,
lo que produciría que las cadenas de mensajes quedaran de la siguiente forma incluso luego de limpiar el
desface en la funcion "obtenerMensajes"

["", "", ...]
["", "", ...]

Por eso cuando recorro las cadenas con el while, si los elementos vacíos se encuentran solo al principio, 
salteo esos caracteres pero no tomo el mensaje como inválido.
*/

function GetMessage(messages){
    let corte = false, c = 0, msg = '', flairVacios = false;
    while (c < messages[0].length && corte == false){
        let cadenas =  messages.map(cadena => {
            return cadena[c]
        });
        const palabra = retornarNoVacia(cadenas);
        if (palabra == ''){
            if (c == 0 || flairVacios == true){
                //Esto lo necesito para no cortar si llegan varias cadenas vacias al principio del arreglo, como en el ejemplo de arriba.
                flairVacios = true;
            }else {
                corte = true;
            }
        }
        else{
            flairVacios = false;
            msg = `${msg} ${palabra}`;
        }  
        c++;
    }
    if (corte == true) {
        return false;
    }
    else {
        //Eliminar el primer espacio que queda en el mensaje
        msg = msg.substring(1);
        return msg;
    }     
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
    //Eliminar desfase
    const lengthMin = Math.min(...messages.map(a => {
        return a.length;
    }));
    messages.forEach(message => {
        //Si tiene mas elementos que el array con menos elementos, entonces hay un desface 
        if (message.length > lengthMin){
            //Elimino ese desfase
            message = message.splice(0, message.length - lengthMin);
        }
    });
    return messages;
}

module.exports = {
    GetMessage,
    obtenerMensajes 
}