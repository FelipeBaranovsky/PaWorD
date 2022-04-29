var initialFlag = false;
var specialBtns = [];
var letras = [];
var word = "";
var cant_act = 0;
var puntaje = 0;
//TODO: Hacer la pantalla de game over y resetear el reloj al poner una palabra bien.
//TODO: Hacer que si la palabra esta mal el reloj decremente un poco.
//TODO: Hacer para volver a empezar.
//TODO: Hacer el score y para anotar tu nombre. 
//TODO: API PARA CONECTARSE CON EL DICCIONARIO.
//TODO: Hacer el toplaers.
//HELP: Porque cuando apreto una tecla se pone el borde amarillo

function wordEdition(event){
    var codigo = event.which || event.keyCode;

    if (codigo === 13) { //Separar en funciones
        puntaje += word.length;
        
        document.getElementById("scoreScreen").innerHTML = puntaje + " pts";
        word = "";
        actualizarPanel();
        if(cant_act >= 31){
            cant_act = cant_act - 30;
        }else{
            cant_act = 0;
        }
        console.log("El nuevo tiempo es: " + cant_act);
        document.getElementById("cir").style.strokeDashoffset = (cant_act*100/60) * 1510/100;
    }

    if(codigo === 8){ 
        console.log(word.toString().substring(0, word.length-1));
        word = word.toString().substring(0, word.length-1);
        actualizarPanel();
      }

    if(codigo >= 65 && codigo <= 90){
        if(letras.toString().includes(String.fromCharCode(codigo))){
            word += String.fromCharCode(codigo);
            actualizarPanel();
        }
    }

}
function actualizarPanel(){
    document.getElementById("screen").value = word;
}

function calcularAnimacion(){

    let cantMax = 60;
    let element = document.getElementById("cir");
    const animar = () => {
        act_cont = () => {    
            element.style.strokeDashoffset = (cant_act*100/60) * 1510/100; 
            cant_act += 1;
            console.log(cant_act);
            if(cant_act <= cantMax){
                setTimeout(act_cont, 1000);
            }else{
                console.log("Se acabo el tiempo");
                //TiempoTerminado
                //Pantalla de game over
                //Resetear
            }
        }
        act_cont();
    }
    animar();
}

function clickPanelBtn(id, e){

    if(e.button == 2){
        console.log("Click derecho");
    }else{
        console.log("Restr");
    }


    var aux = false;
    if(initialFlag == false){
        calcularAnimacion();
        initialFlag = true;
        let element = document.getElementById("cir");
        let element2 = document.getElementById("screen");
        let element3 = document.getElementById("scoreScreen");
        let element4 = document.getElementById("TOPplayers");
        element.setAttribute("style","display:block;");
        element2.setAttribute("style","display:block;");
        element3.setAttribute("style","display:flex;");
        element4.setAttribute("style","display:block;");
        cargarLetras();
    }else{
        elementBtn = document.getElementById(id);
        word += elementBtn.innerHTML;
        console.log(word);
        actualizarPanel();  
    }
    
}

function cargarLetras(){
    letras = llenarLetras(); //Debe calcular que al menos dos vocales tiene que tener.
    //var letras = ["A","B","C","D","E","F","G","H","I"];
    for(let i = 0; i < 9; i++){
        let element = document.getElementById("P"+(i+1).toString());
        element.innerHTML = letras[i];
    }

    specialBtns = generarPlataformas();
    colorearSpecialBtns(specialBtns);

}

function llenarLetras(){
    var vocales = ["A","E","I","O","U"];
    var consonantes = ["B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"];
    var letras = [];
    var maxJ = 0;
    for(let i = 0; i < 9; i++){
        var value = Math.floor(Math.random() * consonantes.length);
        letras.push(consonantes.splice(value,1));

    }
    if(Math.floor(Math.random() * (2 - 0) + 0) == 0){
        maxJ = 1;
    }else{
        maxJ = 2;
    }

    for(let j = 0; j < maxJ; j++){
        var value = Math.floor(Math.random() * letras.length);
        var value2 = Math.floor(Math.random() * vocales.length);
        letras[value] = vocales.splice(value2,1);
    }

    return letras;
}

function generarPlataformas(){
    valores = [];
    var goldValue = Math.floor(Math.random() * 9);
    valores.push(goldValue);
    var maxGreen = 0;
    if(Math.floor(Math.random() * (2 - 0) + 0) == 0){
        maxGreen = 1;
    }else{
        maxGreen = 2;
    }
    for(let j = 0; j < maxGreen; j++){
        var valueGreen = Math.floor(Math.random() * 9);
        while(goldValue == valueGreen){
            valueGreen = Math.floor(Math.random() * 9);
        }
        valores.push(valueGreen);
    }
    return valores;
}

function colorearSpecialBtns(valores){
    for(let i = 0; i < valores.length; i++){
        if(i == 0){
            //Gold
            document.getElementById("P"+(valores[i]+1).toString()).classList.add("PanelMainly");
        }else{
            //Green
        }
        document.getElementById("P"+(valores[i]+1).toString()).classList.add("PanelExtraPoints");
    }
}