let canvas;
let ctx;
let fps = 50;
 
let widthF = 50;
let heightF = 50;

let tilemap;

let cesped = "#044f14";
let puerta = "#3a1700";
let tierra = "#c6892f";
let llave = "#c6bc00";

let prota;
let imgAntorcha = [];
let enemigo = [];

let scene = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0],
  [0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0],
  [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 0, 2, 2, 3, 0, 2, 0, 0, 2, 2, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0],
  [0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 1, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function paintScene() {
  //var color;

  for (c = 0; c < 10; c++) {
    for (f = 0; f < 15; f++) {

      let tile = scene[c][f];
      ctx.drawImage(tilemap, tile*32, 0, 32, 32, widthF*f, heightF*c, widthF, heightF);

      /* if (scene[c][f] == 0) {
        color = cesped;
      }
      if (scene[c][f] == 1) {
        color = puerta;
      }
      if (scene[c][f] == 2) {
        color = tierra;
      }
      if(scene[c][f] == 3)
        color = llave;

      ctx.fillStyle = color;
      ctx.fillRect(f * widthF, c * heightF, widthF, heightF); */
    }
  }
}

let antorcha = function(x, y){
  this.x = x;
  this.y = y;

  this.fotograma = 0;
  this.contador = 0;
  this.retardo = 10;

  this.cambiarFotogramas = function(){
    if(this.fotograma < 3){
      this.fotograma++;
    }else{
      this.fotograma = 0;
    }
  }

  this.paint = function(){
    if(this.contador < this.retraso){
      this.contador++;
    }else{
      this.contador = 0;
      this.cambiarFotogramas();
    }
    ctx.drawImage(tilemap, this.fotograma*32, 64, 32, 32, widthF*x, heightF*y, widthF, heightF);
  }

}

let bad = function(x,y){
  this.x = x;
  this.y = y;
  this.address = Math.floor(Math.random()*4);
  this.retraso = 50;
  this.fotograma = 0;

  this.paint = function(){
    ctx.drawImage(tilemap, 32, 32, 32, 32, this.x * widthF, this.y * heightF, widthF, heightF);
  }

  this.validarColision = function(x, y){
    let colision = false;

    if(scene[y][x] == 0)
      colision = true;

    return colision;
  }

  this.move = function(){

    prota.colisionEnemigo(this.x, this.y);

    if(this.fotograma < this.retraso){
      this.fotograma++;
    }else{

      this.fotograma = 0;

       //Above
    if(this.address == 0){
      if(this.validarColision(this.x, this.y-1) == false){
        this.y--;
      }else{
        this.address = Math.floor(Math.random()*4);
      }
    }
    //Bellow
    if(this.address == 1){
      if(this.validarColision(this.x, this.y+1) == false){
        this.y++;
      }else{
        this.address = Math.floor(Math.random()*4);
      }
    }
    //Left
    if(this.address == 2){
      if(this.validarColision(this.x-1, this.y) == false){
        this.x--;
      }else{
        this.address = Math.floor(Math.random()*4);
      }
    }
    //Rihgt
    if(this.address == 3){
      if(this.validarColision(this.x+1, this.y) == false){
        this.x++;
      }else{
        this.address = Math.floor(Math.random()*4);
      }
    }


    }
   
  }

}

let player = function () {
  this.x = 1;
  this.y = 1;
  this.color = "#820c01";
  this.llave = false;

  this.paint = function () {
    //ctx.fillStyle = this.color;
    //ctx.fillRect(this.x * widthF, this.y * heightF, widthF, heightF);
    ctx.drawImage(tilemap, 0, 32, 32, 32, this.x * widthF, this.y * heightF, widthF, heightF);
  };

  this.colisionEnemigo = function(x, y){
    if(this.x == x && this.y == y){
      this.partidaPerdida();
    }
  }

  this.margen = function (x, y) {
    let colision = false;

    if (scene[y][x] == 0) {
      colision = true;
    }

    return colision;
  };

  this.above = function () {
    if (this.margen(this.x, this.y - 1) == false) {
      this.y--;
      this.obtenerObjecto();
    }
  };

  this.below = function () {
    if (this.margen(this.x, this.y + 1) == false){ 
      this.y++;
      this.obtenerObjecto();
  
    }
  };

  this.left = function () {
    if (this.margen(this.x - 1, this.y) == false) {
      this.x--;
      this.obtenerObjecto();
    }
  };

  this.right = function () {
    if (this.margen(this.x + 1, this.y) == false) {
      this.x++;
      this.obtenerObjecto();
    }
  };

  this.gameOver = function(){
    this.llave = false;
    scene[6][7] = 3;
    this.x = 1;
    this.y = 1;
    console.log("Ganaste!!");
  }

  this.partidaPerdida = function(){
    this.llave = false;
    scene[6][7] = 3;
    this.x = 1;
    this.y = 1;
    console.log("Has Perdido!!");
  }
  
  this.obtenerObjecto= function(){
    objeto = scene[this.y][this.x];

    if(objeto == 3){
      this.llave = true;
      scene[this.y][this.x] = 2;
      //console.log("Tienes la llave!!!");
    }

    //reiniciar !!
    if(objeto == 1 && this.llave)
      this.gameOver();

  }

};

function inicializar() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  prota = new player();

  tilemap = new Image();
  tilemap.src = "image/tilemap.png";

  enemigo.push(new bad(8,3));
  enemigo.push(new bad(5,7));
  enemigo.push(new bad(6,2));

  imgAntorcha.push( new antorcha(0,0));
  imgAntorcha.push( new antorcha(14,0));
  imgAntorcha.push( new antorcha(0,9));
  imgAntorcha.push( new antorcha(14,9));
  imgAntorcha.push( new antorcha(9,8));
  imgAntorcha.push( new antorcha(10,5));
  imgAntorcha.push( new antorcha(2,2));
  imgAntorcha.push( new antorcha(4,7));

  document.addEventListener("keydown", function (tecla) {
    if (tecla.keyCode == 38) {
      prota.above();
      //console.log(tecla.keyCode);
    }

    if (tecla.keyCode == 40) {
      prota.below();
      //console.log(tecla.keyCode);
    }

    if (tecla.keyCode == 37) {
      prota.left();
      //console.log(tecla.keyCode);
    }

    if (tecla.keyCode == 39) {
      prota.right();
      //console.log(tecla.keyCode);
    }
  });

  setInterval(function () {
    main();
  }, 1000 / fps);
}

function borrarCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}

function main() {
  borrarCanvas();
  paintScene();
  prota.paint();
  for(c = 0; c< imgAntorcha.length;c++)
    imgAntorcha[c].paint();

  for(c = 0; c < enemigo.length; c++){
    enemigo[c].paint();
    enemigo[c].move();
  }
}
