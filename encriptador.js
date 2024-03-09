let mensajeUsuario = "";
let clave = "";

function obtenerMensaje(){
    return document.getElementById("mensaje").value;
}

function obtenerClave(){
    return document.getElementById("clave").value;
}

function validar(clave, mensaje){
    for (var i = 0; i < clave.length; i++){
        let asciiClave = clave.charCodeAt(i);
        if (asciiClave < 97 || asciiClave > 122){
            alert("La clave de encriptado solo debe contener letras")
            return false;
        }
    }

    if (clave === "" || mensaje === ""){
        alert(`Porfavor ingresa ${(clave === "") ? "la clave":"un mensaje"}`);
        return false;
    } else{
        return true;
    }
}

function encriptar(){
    let mensajeCifrado = "";
    mensajeUsuario = obtenerMensaje().toLowerCase();
    clave = obtenerClave().toLowerCase();

    // Comprobar que se hayan ingresado los parametros de la encriptación
    if (validar(clave, mensajeUsuario)){
        let claveIndex = 0;

        // Recorrer la cadena
        for (var i = 0; i < mensajeUsuario.length; i++) {
            let asciiMensaje = mensajeUsuario.charCodeAt(i);

            // Cifrar los valores que esten en el alfabeto (Inglés)
            if (asciiMensaje >= 97 && asciiMensaje <= 122) {
                let asciiClave = clave.charCodeAt(claveIndex % clave.length);
                let asciiCifrado = ((asciiMensaje - 97) + (asciiClave - 97)) % 26 + 97;
                mensajeCifrado += String.fromCharCode(asciiCifrado);
                claveIndex++;
            } else {
                mensajeCifrado += mensajeUsuario[i];
            }
        }
        // Mostrar el mensaje cifrado
        salidaMensaje(mensajeCifrado);
        habilitarCopia();
        return;
    }
}

function desencriptar(){
    let mensajeDescifrado = ""
    mensajeUsuario = obtenerMensaje().toLowerCase() ;
    clave = obtenerClave().toLowerCase();

    // Comprobar que se hayan ingresado los parametros de la encriptación
    if (validar(clave, mensajeUsuario)){
        let claveIndex = 0;

        // Recorrer la cadena
        for (var i = 0; i < mensajeUsuario.length; i++) {
            let asciiCifrado = mensajeUsuario.charCodeAt(i);
            
            // Cifrar los valores que esten en el alfabeto (Inglés)
            if (asciiCifrado >= 97 && asciiCifrado <= 122) {
                let asciiClave = clave.charCodeAt(claveIndex % clave.length);
                let asciiDescifrado = ((asciiCifrado - 97) - (asciiClave - 97) + 26) % 26 + 97;
                mensajeDescifrado += String.fromCharCode(asciiDescifrado);
                claveIndex++;
            } else {
                mensajeDescifrado += mensajeUsuario[i];
            }
        }

        // Mostrar mensaje descifrado
        salidaMensaje(mensajeDescifrado);
        habilitarCopia();
        return;
    }
}

function salidaMensaje(mensajeMuestra){
    document.getElementById("mensajeSalida").value = mensajeMuestra;
}

function habilitarCopia(){
    document.getElementById("botonCopiar").removeAttribute("disabled");
}

function copiarMensaje(){
    const mensaje = document.getElementById("mensajeSalida").value;
    navigator.clipboard.writeText(mensaje)
    alert("El mensaje ha sido copiado al portapapeles");
}
