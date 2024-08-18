export function handleTrabaja(){
    var datosLaborales = document.getElementById("datosLaborales");
    if(document.getElementById("siTrabaja").checked){
        datosLaborales.style.display = "block";
    }
    if(document.getElementById("noTrabaja").checked){
        datosLaborales.style.display = "none";
    }
}
export function handleObra(){
    var obraSocial = document.getElementById("obraSocial");
    if(document.getElementById("siObraSocial").checked){
        obraSocial.style.display = "block";
    }
    if(document.getElementById("noObraSocial").checked){
        obraSocial.style.display = "none";
    }
}
