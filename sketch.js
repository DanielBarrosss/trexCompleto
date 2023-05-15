var trex, trexRun
var ground, groundImg
var invisible
var nuvem, nuvemImg
var cacto, cactoImg1, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6
var score=0;
var recorde=0;
var play=1;
var end=0;
var gameState=play
var cactoGp,nuvemGp
var trexCollided
var gameOver,gameOverImg
var restart, restartImg
var jumpSound,pointSound,dieSound

 

//preload carrega as midías do jogo 
function preload() {
  trexRun = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  cactoImg1 = loadImage("obstacle1.png");
  cactoImg2 = loadImage("obstacle2.png");
  cactoImg3 = loadImage("obstacle3.png");
  cactoImg4 = loadImage("obstacle4.png");
  cactoImg5 = loadImage("obstacle5.png");
  cactoImg6 = loadImage("obstacle6.png");
  trexCollided = loadAnimation("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg =loadImage("restart.png");
  jumpSound = loadSound("jump.mp3")
  pointSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
}
//setup faz a aconfiguração
function setup() {
  createCanvas(windowWidth,windowHeight );
  // criando as bordas
  trex = createSprite(50, height-40, 20, 50);
  trex.addAnimation("run", trexRun);
  trex.addAnimation("collided",trexCollided);
  trex.scale = 0.5;
  trex.debug=false;
  //trex.setCollider("rectangle",0,0,100,100)
  trex.setCollider("circle",0,0,30)

  ground = createSprite(width/2, height-30, width, 2);
  ground.addImage("ground", groundImg);

  invisible = createSprite(width/2, height-10, width, 2)
  invisible.visible = false;

  cactoGp=new Group()
  nuvemGp=new Group()

  gameOver = createSprite(width/2,height-120);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;

  restart = createSprite(width/2,height-90);
  restart.addImage(restartImg);
  restart.scale=0.5

  gameOver.visible=false;
  restart.visible=false;
  

 
}
//draw faz o movimento, a ação do jogo
function draw() {
  background("#f0f9f7");
  
  text("Pontuação: "+score,width-170 ,height-150);
  text("Recorde: "+recorde,width-170,height-130);
  

if (gameState===play) {
  score+=Math.round(getFrameRate()/60);
  
  if(score>0&&score%100===0){
    pointSound.play()
  }
  ground.velocityX = -(6+score/100)
  if (ground.x < 0) {
    ground.x = ground.width / 2
  }

  if (touches.length>0||keyDown("space") && trex.y > height-46||touches.length>0|| keyDown("up") && trex.y > height    -46) {
    trex.velocityY = -12;
  jumpSound.play()
  touches=[]
  
  }
  gerarNuvem()
  createCactos()
}

if(trex.isTouching(cactoGp)){
  gameState=end;
  //dieSound.play()
}

if (gameState===end) {
  trex.changeAnimation("collided",trexCollided); 
  cactoGp.setVelocityXEach(0);
  nuvemGp.setVelocityXEach(0);
  cactoGp.setLifetimeEach(-1);
  nuvemGp.setLifetimeEach(-1);
  ground.velocityX=0;
  gameOver.visible=true;
  restart.visible=true;

  if(recorde<score){ 
    recorde=score
  }
  if(mousePressedOver(restart)){
  gameState=play
  gameOver.visible=false
  restart.visible=false
  cactoGp.destroyEach()
  nuvemGp.destroyEach()
  trex.changeAnimation("run",trexRun)
  score=0
  }
}
 
 


 

  

 
  trex.velocityY += 0.5;
  trex.collide(invisible);

  //coordenadas do mouse na tela
  text("X: " + mouseX + "/ Y: " + mouseY, mouseX, mouseY);
  drawSprites();

}


function gerarNuvem() {
  if (frameCount % 80 === 0) {
    nuvem = createSprite(width, random(height-190, height-100), 40, 10);
    nuvem.velocityX = -(4+score/100)
    nuvem.addImage(nuvemImg);
    nuvem.scale = random(0.4, 1.4);
    nuvem.depth = trex.depth - 1;
    nuvem.lifetime = 220;
nuvemGp.add(nuvem);
  }


}
function createCactos() {
  if (frameCount % 60 === 0) {
    cacto = createSprite(width, height-30, 10, 15);
    cacto.velocityX = -(6+score/100);
    cacto.scale = 0.5;
    cacto.lifetime = 220;
    cacto.depth = trex.depth - 1
    cactoGp.add(cacto);

    var sorte = Math.round(random(1, 6))
    switch (sorte) {
      case 1: cacto.addImage(cactoImg1);
        break;
      case 2: cacto.addImage(cactoImg2);
        break;
      case 3: cacto.addImage(cactoImg3);
        break;
      case 4: cacto.addImage(cactoImg4);
        break;
      case 5: cacto.addImage(cactoImg5);
        break;
      case 6: cacto.addImage(cactoImg6);
        break;
    }
  }
}
