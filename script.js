// Definición variables
let matrizCodigo = new Map([["e", "enter"], ["i", "imes"], ["a", "ai"], ["o","ober"], ["u","ufat"]]);
const inputTexto = document.querySelector(".input-texto");
const mensaje = document.querySelector(".mensaje");
const btnCopy = document.querySelector(".copiar");
const btnPaste = document.querySelector(".pegar");
const modal = document.getElementById("miModal");
const span = document.getElementsByClassName("cerrar")[0];
btnCopy.style.display = "none";
btnPaste.style.display = "none";

function limpiarInputTexto(){
    inputTexto.value = "";
}

function actualizarMensaje(texto){
    mensaje.value = texto;
    mensaje.style.backgroundImage = "none";
}

//Encriptar mensaje

function btnEncriptar() {
    if(!inputTexto.value.trim()){
        showMessage("Ingrese un texto para poder activar la encriptación");
        return;
    }
    const textoEncriptado = encriptar(inputTexto.value);
    actualizarMensaje(textoEncriptado);
    limpiarInputTexto();
    btnCopy.style.display = "block"; // Muestra el botón copiar.
}

function showMessage(mensaje){
    
    modal.style.display = "block";
    document.getElementById("mensaje").innerText = mensaje;
    // Código de cierre cuando usuario da click en "X"
    span.onclick = function() {
    modal.style.display = "none";
    }
    // Cuando el usuario da click por fuera del modal y así cerrarlo
    document.addEventListener("click", function(event){
        if(event.target == modal){
            modal.style.display = "none";
        }
    });
}

function encriptar(stringEncriptada){    
    stringEncriptada = stringEncriptada.toLowerCase();
    
    for(let [key, value] of matrizCodigo){
        if(stringEncriptada.includes(key)){
            stringEncriptada = stringEncriptada.replaceAll(key, value);
        }
    }
    return stringEncriptada;
}

//Desencriptar mensaje

function btnDesencriptar() {
    const textoEncriptado = desencriptar(inputTexto.value)
    mensaje.value = textoEncriptado
    limpiarInputTexto();
}

function desencriptar(stringDesencriptada) {
    stringDesencriptada = stringDesencriptada.toLowerCase();

    matrizCodigo.forEach((value, key) => {
        if(stringDesencriptada.includes(value)) {
            stringDesencriptada = stringDesencriptada.replaceAll(value, key)
        }
    });
    return stringDesencriptada;
}



function copiar() {
    mensaje.select();
    navigator.clipboard.writeText(mensaje.value)
    limpiarInputTexto();
    showMessage("Texto Copiado");
    btnPaste.style.display = "block";
}


function pegar() {
    navigator.clipboard.readText().then(function(text){
        inputTexto.value = text;
    })
}