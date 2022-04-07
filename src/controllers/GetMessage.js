/*
[   ""  ,   “”      ,   “este”  ,   “es”  ,     “un”    ,     “mensaje”]
[                       “este”  ,   “”    ,     “un”    ,     “mensaje”]
[   ""  ,   “”      ,   ””      ,   ”es”  ,     ””      ,     ”mensaje”]


*/
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
    while (c < messages[0].length || corte == true){
        let cadenas =  messages.map(a => {
            return a[c]
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
        msg = msg.slice(1, -1);
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
    messages.forEach(a => {
        //Si tiene mas elementos que el array con menos elementos, entonces hay un desface 
        if (a.length > lengthMin){
            //Elimino ese desfase
            a = a.splice(0, a.length - lengthMin);
        }
    });
    return messages;
}

module.exports = {
    GetMessage,
    obtenerMensajes 
}