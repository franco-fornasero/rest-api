/* Supongo que puede darse el caso de que todos los satelites que estoy controlando tengan desface,
lo que produciría que las cadenas de messages quedaran de la siguiente forma incluso luego de limpiar el
desface en la funcion "obtenermessages"

["", "", ...]
["", "", ...]

Por eso cuando recorro las cadenas con el while, si los elementos vacíos se encuentran solo al principio, 
salteo esos caracteres pero no tomo el message como inválido.
*/

const getMessage = (req, res, next) => {
    const { messages } = req;
    let stop = false, c = 0, msg = '', flagEmpty = false;
    while (c < messages[0].length && stop == false){
        let cadenas =  messages.map(cadena => {
            return cadena[c]
        });
        const word = returnNotEmpty(cadenas);
        if (word == ''){
            if (c == 0 || flagEmpty == true){
                //Esto lo necesito para no cortar si llegan varias cadenas vacias al principio del arreglo, como en el ejemplo de arriba.
                flagEmpty = true;
            }else {
                stop = true;
            }
        }
        else{
            flagEmpty = false;
            msg = `${msg} ${word}`;
        }  
        c++;
    }
    if (stop == true) {
        req.msg = false;
    }
    else {
        //Eliminar el primer espacio que queda en el message
        req.msg = msg.substring(1);
    }  
    next();   
}

const returnNotEmpty = cadenas =>{
    let word = ''
    cadenas.forEach(message => {
       if (message != ''){
           word = message; 
       }
    });
    return word;
}


const getMessages = (req, res, next) => {
    const {satellites} = req.body;
    let messages = satellites.map(satellite => {
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
    req.messages = messages;
    next();
}

module.exports = {
    getMessages,
    getMessage 
}