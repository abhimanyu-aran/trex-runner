var trex,ground,invisibleGround,trexcollided,trexrunning,groundimage,cloudimage,cloudgroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclegroup,score,play,end,gamestate,gameover,restart,gameoverimage,restartimage  

function preload () {
  trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png")
  trexcollided = loadImage("trex_collided.png")
  groundimage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameoverimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
}

function setup() { 
  createCanvas(600, 200);
  score = 0
  trex = createSprite(50,180,20,50)
  trex.addAnimation("running",trexrunning)
  trex.addAnimation("collided",trexcollided)
  trex.scale = 0.5;
  
  gameover = createSprite(300,80,10,10)
  gameover.addImage("gameover",gameoverimage)
  gameover.visible = false
  
  restart = createSprite(300,120,10,10);
  restart.addImage("restart",restartimage)
  restart.scale= 0.45
  restart.visible = false
  
  
  ground = createSprite(200,195,400,5)
  ground.addImage("ground",groundimage)
  ground.x = ground.width/2
  ground.velocityX = -(6+3*score/100)
  
  invisibleGround = createSprite(200,196,400,5)
  invisibleGround.visible = false
  
  cloudgroup = new Group()

  obstaclegroup = new Group()
    
  
  
  play = 1
  
  end = 0
  gamestate = play
  
  
  
}

function draw() {
  background(180);
  
   text("score:"+score,520,10)
   trex.collide(invisibleGround);
  
  if (gamestate === play){
      score = score+Math.round(getFrameRate()/60)
    
    if (obstaclegroup.isTouching(trex)){
      gamestate= end
    }
 ground.velocityX = -(6+3*score/100)
    
  trex.collide(invisibleGround);
  trex.velocityY = trex.velocityY + 0.7

  
  
  if(ground.x < 0) {
    ground.x = ground.width/2
  }
  
  if(keyDown("space")&&(trex.y >= 170)){
    trex.velocityY = -12
  }  

  spawnclouds();
  spawnObstacles();
    
    
  }
  
  if(gamestate === end){
    trex.velocityY = 0
    ground.velocityX = 0
    restart.visible = true
    gameover.visible = true
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1) 
    trex.changeAnimation("collided",trexcollided)
    
    if(mousePressedOver(restart)){
      reset()
    }
    
  }
  
  
  drawSprites();
}

function spawnclouds(){
  
   if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
       
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
     cloudgroup.add(cloud)
   }
}
  
  function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,175,10,40);
    obstacle.velocityX = ground.velocityX
    
    //generate random obstacles
    var rand = Math.round (random (1,6))
    
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
        break
         case 2:obstacle.addImage(obstacle2)
        break
         case 3:obstacle.addImage(obstacle3)
        break
         case 4:obstacle.addImage(obstacle4)
        break
         case 5:obstacle.addImage(obstacle5)
        break
         case 6:obstacle.addImage(obstacle6)
        break
        default:break
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
  obstaclegroup.add(obstacle)
  }
      
}
    
    function reset(){
      gamestate = play
      gameover.visible = false
      restart.visible = false
      obstaclegroup.destroyEach()
      cloudgroup.destroyEach()
        trex.changeAnimation("running",trexrunning)
score = 0
      ground.velocityX = -(6+3*score/100)
      
    }
    


