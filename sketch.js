var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Estados do Jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("fimdeJogo.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Fundo se movendo
path=createSprite(width/2,height/2);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1


//criando menino correndo
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

gameOver = createSprite(width/2,height/2,20,20)
gameOver.addAnimation("fim",endImg);
gameOver.scale=0.6;
gameOver.visible = false;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para redefinir o fundo
  if(path.y > 600 ){
    path.y = 300;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        gameOver.visible = true;
        
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouros: "+ treasureCollection,width/10,height/80+10);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(width/10,width-10),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = height/5;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(width/10, width-10),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = height/5;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(width/10, width-10),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = height/5;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(width/10, width-10),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = height/5;
  swordGroup.add(sword);
  }
}
