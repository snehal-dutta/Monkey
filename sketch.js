//variables
  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var foodGroup, obstaclesGroup
  var score
  var ground
  
 //variables for game states
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  
 //for loading images and animations
 function preload(){

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png",           "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png",         "sprite_6.png", "sprite_7.png", "sprite_8.png")
   
  monkey_collide = loadAnimation("sprite_1.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 }

 function setup() {
 
 //creating canvas
  createCanvas(800,400);
 
 //creating sprite for monkey, adding its animation and scalling it
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collide);
  monkey.scale = 0.1
  monkey.debug = false;
  monkey.setCollider("circle", 0, 0, 300);
  
 //creating sprite for ground   
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  
 //scoring system
   survivalTime = 0;
   score = 0;

 //creating groups
   foodGroup = createGroup();
   obstaclesGroup = createGroup();
  }

function draw() {
 
 //giving colour to background 
   background("white");
  
 //score  
   textSize(20);
   fill("black");
   text("Score: "+ score, 500, 30);

 //survival time 
  textSize(20);
   fill("black");
   text("Survival Time: "+ survivalTime, 100, 30);
  
  if (gameState === PLAY) {
    //endless scrolling effect of the ground  
  ground.x = ground.width/2;
  
 //making the mobkey jump using space key
  if(keyDown("space")) {
    monkey.velocityY = -12;
  }
 //survival time rate should work only in play state   
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
 //endless scrolling effect of the ground  
  ground.x = ground.width/2;
  
  //adding gravity to monkey 
    monkey.velocityY = monkey.velocityY + 0.8;
    
  //calling functions 
    food();
    obstacles();
    
  //to score when monkey touched banana
    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score + 1;
    }
    
 //end gameState
  if(obstaclesGroup.isTouching(monkey)) {
    gameState = END;

 //changing monkey animation
  monkey.changeAnimation("collided", monkey_collide);
  }

} else if (gameState === END) {
  //setting velocity of all the sprites
    obstaclesGroup.setVelocityXEach(0); 
    foodGroup.setVelocityXEach(0);
    monkey.velocityX = 0;
    ground.velocityX = 0;
  
  //setting lifetime so that sprites dont disappear
   obstaclesGroup.setLifetimeEach(-1);
   foodGroup.setLifetimeEach(-1);
  
  //to make the monkey remain on ground
   monkey.velocityY = 0;
  
 //to make bananas disappear
  foodGroup.destroyEach();
  
 //to display game over and "R"
  stroke(20);
  fill("red");
  text("GAME OVER!!!", 320, 100);
  
  stroke(10);
  fill("black");
  text("Press R to restart", 320, 140);
  
  if(keyDown("R")) {
    reset();
  }
}
  
  //making the monkey stay on ground  
   monkey.collide(ground)
 
 
 //drawing sprites 
  drawSprites();
   }
 
function food() {
  
 //making bananas appear at different frame rates 
  if(frameCount % 150 === 0) {
    
 //creating banana sprite
    banana = createSprite(800, Math.round(random(120, 200)), 10, 10);
    
  //adding animations
    banana.addAnimation("food", bananaImage);
    
 //adding velocity, lifetime and scaling the bananas
    banana.velocityX = -5;
    banana.lifetime = 300;
    banana.scale = 0.1;
    
 //groups
   foodGroup.add(banana);
 }
}
 
function obstacles() {
  
 //making stones appear at different frame rates 
  if(frameCount % 300 === 0) {
    
 //creating stone sprite and adding its animation
    obstacle = createSprite(800, 310, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.debug = false;
    obstacle.setCollider("circle", 0, 100, 250)
    
 //adding lifetime, velocity and scaling the obstacles
    obstacle.lifetime = 300;
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    
 //groups
    obstaclesGroup.add(obstacle);
    }
}

function reset() {
 //setting game state 
  gameState = PLAY;
  
 //making obstacles disappear
  obstaclesGroup.destroyEach();
  
 //resetting score and survival time
  score = 0;
  survivalTime = 0;
  
  //changing monkey animation
   monkey.changeAnimation("running", monkey_running);
}





