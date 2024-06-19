// Para que lea los botones
//document.addEventListener('keydown', function(tecla){
    //console.log(tecla.keyCode); // chrome google
    //console.log(tecla.keyIdentifier); // Microsoft edge 
//});
/*
var configTeclado = {prevent_repeat: true};
var eventTeclado = new window.keypress.Listener(this, configTeclado);

function pressA(){
    console.log('Has presionado a');
}

eventTeclado.simple_combo('a', pressA);

*/
/*
function inicializar(){
    myCanvas = document.getElementById("canvas");
    myCanvas.addEventListener('mousedown', clickRaton, false);
    myCanvas.addEventListener('mousedown', sueltaRaton, false);
    myCanvas.addEventListener('mousemove', posicionRaton, false);
}

function posicionRaton(e){
    x = e.pageX;
    y = e.pageY;
    console.log("X: "+x+ " Y: "+y);
}

function clickRaton(e){
    console.log("Pulsando boton");
}

function sueltaRaton(e){
    console.log("raton liberado");
}

*/

var canvas;
var ctx;
var fps = 50;
var img;


var prota = function(x, y){
    this.x = x;
    this.y = y;

    this.dibuja = function(){

    }
}

function inicializar(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    img = new Image();
    img.src = 'image/cube.png';

    setInterval(function(){
        main();
    }, 1000/fps);
}

var protagonista = function(x,y){
    this.x = x;
    this.y = y;

    this.dibuja = function(){
        ctx.drawImage(img, this.x, this.y);
    }
}


var personaje = function(x,y){
    this.x = x;
    this.y = y;
    this.derecha = true;

    this.dibujar = function(){
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x, this.y, 50, 10);
    }

    this.mueve = function(vel){
        if(this.derecha){
            if(this.x < 400)
                this.x+=vel;
            else
                this.derecha = false;
        }else{
            if(this.x > 50)
                this.x-=vel;
            else
                this.derecha = true;
        }
    }
}

var per1 = new personaje(50, 50);
var per2 = new personaje(80, 200);
var per3 = new personaje(30, 400);

var prota = new protagonista(200, 200);


function borrarCanvas(){
    canvas.width = 500;
    canvas.heigth = 400;
}

function main(){
    borrarCanvas();
    per1.dibujar();
    //per2.dibujar();
    //per3.dibujar();

    //per1.mueve(3);
    //per2.mueve(4);
    //per3.mueve(2);

    prota.dibuja();
}