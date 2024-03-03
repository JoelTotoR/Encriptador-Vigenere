let mensajeUsuario = "";
let clave = "";

function obtenerMensaje(){
    return document.getElementById("mensaje").value;
}

function obtenerClave(){
    return document.getElementById("clave").value;
}

function validar(clave, mensaje){
    if (clave === "" || mensaje === ""){
        alert(`Porfavor ingresa ${(clave === "") ? "la clave":"un mensaje"}`);
        return false;
    } else{
        return true;
    }
}

function encriptar(){
    let mensajeCifrado = "";
    mensajeUsuario = obtenerMensaje().toUpperCase();
    clave = obtenerClave().toUpperCase();

    // Comprobar que se hayan ingresado los parametros de la encriptación
    if (validar(clave, mensajeUsuario)){
        let claveIndex = 0;

        // Recorrer la cadena
        for (var i = 0; i < mensajeUsuario.length; i++) {
            let asciiMensaje = mensajeUsuario.charCodeAt(i);
            
            // Cifrar los valores que esten en el alfabeto (Inglés)
            if (asciiMensaje >= 65 && asciiMensaje <= 90) {
                let asciiClave = clave.charCodeAt(claveIndex % clave.length);
                let asciiCifrado = ((asciiMensaje - 65) + (asciiClave - 65)) % 26 + 65;
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
    mensajeUsuario = obtenerMensaje().toUpperCase();
    clave = obtenerClave().toUpperCase();

    // Comprobar que se hayan ingresado los parametros de la encriptación
    if (validar(clave, mensajeUsuario)){
        let claveIndex = 0;

        // Recorrer la cadena
        for (var i = 0; i < mensajeUsuario.length; i++) {
            let asciiCifrado = mensajeUsuario.charCodeAt(i);
            
            // Cifrar los valores que esten en el alfabeto (Inglés)
            if (asciiCifrado >= 65 && asciiCifrado <= 90) {
                let asciiClave = clave.charCodeAt(claveIndex % clave.length);
                let asciiDescifrado = ((asciiCifrado - 65) - (asciiClave - 65) + 26) % 26 + 65;
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
