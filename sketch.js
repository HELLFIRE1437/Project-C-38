var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage ;
var bananaGroup, obstacleGroup ;
var ground, bg , bgImg;
var score = 0;
var size_score = 0;
var power_on = false;
var gameState = "play";
var gameover,overImg;
var restart,restartImg;

function preload(){  
  monkey_running = loadAnimation("images/sprite_0.png","images/sprite_1.png","images/sprite_2.png","images/sprite_3.png",
  "images/sprite_4.png","images/sprite_5.png","images/sprite_6.png","images/sprite_7.png","images/sprite_8.png")
  bananaImage = loadImage("images/banana.png");
  obstacleImage = loadImage("images/obstacle.png");
  bgImg = loadImage("images/bg6.png");
  overImg = loadImage("images/gameover.png");
}



function setup() {
  
  createCanvas(500,400)
  bg = createSprite(350,220);
  bg.addImage("bg",bgImg);
  bg.scale = 2 ;
  monkey = createSprite(100 , 350 , 30,30);
  monkey.addAnimation("running-",monkey_running);
  monkey.scale = 0.18;
  monkey.velocityX = 3 ; 
  //monkey.debug = true;
  monkey.setCollider("rectangle",0,25,500,650);
  ground = createSprite(300, 390  , 650 , 20);
  ground.visible = false;
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  gameover = createSprite(monkey.x - 500,130);
  gameover.addImage("over",overImg);

}


function draw() {

  background("turquoise");

  drawSprites();

  scoring();
  
  camera.position.x = monkey.x ;

  if(bg.x + 250 < monkey.x){
    bg.x = monkey.x + 250 ;
  }
  if(ground.x + 100 < monkey.x){
    ground.x = ground.x + 250
  }

  if(gameState === "play"){
    console.log("Play !!")
    monkey.visible = true;
    monkey.velocityX = 3 ;
    gameover.x = monkey.x - 500 ;
    screen_reset();

    if((keyDown("Space") || keyDown(UP_ARROW)) && monkey.y > 310){
      //console.log("hi")
      monkey.velocityY = -17;
    }

    if(monkey.isTouching(bananaGroup)){
      score += 2;
      if(size_score != 22){ //actual 30 
        size_score += 2;
      }
      bananaGroup.destroyEach();
    }

    monkey.velocityY = monkey.velocityY + 0.7; 
    monkey.collide(ground);
    
    if(monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      if(power_on === false){
        gameState = "end";
      }
      if(power_on === true){
        size_score = 0;
        power_on = false;
      }      
    }
    //console.log(size_score);
    switch (size_score) {
      case 0:  
        monkey.scale = 0.10;
        obstacleGroup.setScaleEach(0.15);
        break;
      case 6: //actual 6
        monkey.scale = 0.12;
        obstacleGroup.setScaleEach(0.17);
        break;
      case 10: //actual 10
        monkey.scale = 0.14;
        obstacleGroup.setScaleEach(0.18)
        break;
      case 20: //actual 20
        monkey.scale = 0.16;
        obstacleGroup.setScaleEach(0.2);
        break;
      case 22: // actual 30
        monkey.scale = 0.18;
        obstacleGroup.setScaleEach(0.23);
        power_on = true;
        break;
      default:
        break;
    }

    bananas();
    obstacles();

  }

  if(gameState === "end"){
    gameover.x = monkey.x
    monkey.visible = false;
    bananaGroup.destroyEach();
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    textFont("Algerian");
    text("Press 'Space' to restart",monkey.x - 120,225,250,250);
    console.log("GAME OVER !!")
    if(keyWentDown("Space")){
      score = 0;
      size_score = 0;
      monkey.y = 300 ;
      gameState = "play";
    }
    
  }   

}
function bananas(){
  if(frameCount % 80 === 0 ){
    banana = createSprite(monkey.x + 300 ,  Math.round(random(95,215), 20 , 20));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.15
    banana.velocityX = -3 ;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount % 190 === 0){    
    obstacle = createSprite(monkey.x + 300,335 ,20,20);
    obstacle.addImage("rock",obstacleImage);
    obstacle.scale = 0.15
    obstacle.setCollider("circle" , 0 , 0 , 200);
    obstacle.lifetime = 220;
    obstacle.velocityX = -2 ;
   // obstacle.debug = true;
    obstacleGroup.add(obstacle);
  }
}
function screen_reset(){
  background.velocityX = -3
  if(ground.x < 275){
    ground.x = ground.width / 2;
  }
  if(bg.x < 110){
    bg.x = 350;
  }
}
function scoring(){
  fill("yellow");
  textAlign("center");
  textSize(30);
  if(gameState === "end"){
    //fill("red")
    text("Score : " + score , monkey.x , 195);
    fill("yellow");
  }
  if(gameState === "play"){
    text("Score : " + score , monkey.x + 150 , 60);
  }
  
}



