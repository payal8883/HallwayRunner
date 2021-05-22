var hallwayImg, hallway, bullyImg, bully, trashcanImg, trashcan;

var apple, appleImg, mess, messImg, energy = 5, energyBar;

var player, playerAnimation, invisibleGround, playerJump, playerFall;

var gameState, START = 0, PLAY = 1, END = 2;

var score;




function preload()
{
	hallwayImg = loadImage("hallway.jpg");
	bullyImg = loadImage("bully.png");
	trashcanImg = loadImage("trashcan.png");
	appleImg = loadImage("apple.png");
	messImg = loadImage("puddle.png");
	playerAnimation = loadAnimation("Runner1.png", "Runner2.png");
	playerJump = loadAnimation("RunnerJump.png");
	playerFall = loadAnimation("RunnerFall.png");
	
}

function setup() {
	createCanvas(1200, 800);
	hallway = createSprite(800,400);
	hallway.addImage(hallwayImg);
	hallway.scale = 2.5;

	energyBar = createSprite(1100, 100, 50, 50);

	appleGroup = new Group();
	trashGroup = new Group();
	bullyGroup = new Group();
	messGroup = new Group();

	player = createSprite(300, 550);
	player.addAnimation("player", playerAnimation);
	player.addAnimation("playerF", playerFall);
	player.addAnimation("playerJ", playerJump);
	

	invisibleGround = createSprite(600, 690, 1200, 1);

	gameState = START;

	score = 0;


}


function draw() {
	if(keyWentDown("space") && gameState === 0){
		gameState = 1;
	}

	if(gameState === 1){

		if(player.isTouching(invisibleGround)){
			player.changeAnimation("player", playerAnimation);
		}
		//hallway reset
		if(hallway.x < 400){
			hallway.x = 780;
		}

		//obstacles spawning
		SpawnTrashCan();
		SpawnBully();
		SpawnApple();
		SpawnMess();

		//energyBar
		if(frameCount % 500== 0){
			energy = energy - 1;
		}

		hallway.velocityX = -(4 + 3* score/100)
		//scoring
		score = score + Math.round(getFrameRate()/60);
		
		//switchcase for energy
		switch(energy){
			case 5: energyBar.shapeColor = "blue";
			break;

			case 4: energyBar.shapeColor = "green";
			break;

			case 3: energyBar.shapeColor = "yellow";
			break;

			case 2: energyBar.shapeColor = "orange";
			break;

			case 1: energyBar.shapeColor = "red";
			break;

		}


		

		//apples for energy bar
		if(player.isTouching(appleGroup)){
		energy = energy + 1;
		appleGroup.destroyEach();
		}

		//switching to end state
		if(player.collide(bullyGroup) || player.collide(trashGroup) || player.collide(messGroup) || energyBar.shapeColor === "red"){
		gameState = END;
		appleGroup.destroyEach();
		bullyGroup.destroyEach();
		messGroup.destroyEach();
		trashGroup.destroyEach();
		}

		//gravity
		player.velocityY = player.velocityY + 0.5;

		//jumping runner
		if(player.y > 450 && keyWentDown("space")){
		player.velocityY = -15;
		player.changeAnimation("playerJ", playerJump);
		}
		
		

	}







	//player.debug = true;
	player.setCollider("rectangle", 0, 0, 100, 230);


	//player collides with invisible ground
	player.collide(invisibleGround);
		
	




  if(gameState === 2){
	player.changeAnimation("playerF",playerFall);
	hallway.destroy();
	player.setVelocity(0,0);
	player.y = 650;
	invisibleGround.visible = false;
	energyBar.shapeColor = "red";
	if(keyWentDown("r")){
		player.destroy();
		setup();
		gameState = 0;
		frameCount = 0;
		energy = 5;

	}
	
}

	
	background(0);
	drawSprites();
  //console.log(mouseY);

  if(gameState === 2){
	fill("red");
	textSize(35);
	text("GAME OVER", 450, 400);
	textSize(18);
	fill("red");
	text("Press R to restart", 200, 100);
  }

  if(gameState === 0){
	fill("blue");
	textSize(20);
	text("PRESS SPACE TO START", 500, 100);
	textSize(15);
	text("space to jump; energy bar on top right", 500, 700);
  }
  textSize(20);
  fill("black");
  text("Score: " + score, 100, 100);

  fill(energyBar.shapeColor);
  text("Energy: ", 1000, 105);

 
}

function SpawnTrashCan(){
	if(frameCount % 300 == 0){
		trashcan = createSprite(1300, 650);
		trashcan.addImage(trashcanImg);
		trashcan.lifetime = 200;
		trashcan.scale = 0.1;
		trashGroup.add(trashcan);
		//trashcan.debug = true;
		trashcan.velocityX = -(6 + score/100);

	}

}

function SpawnBully(){
	if(frameCount % 558== 0){
		bully = createSprite(1300, 600);
		bully.addImage(bullyImg);
		bully.lifetime = 200;
		bully.scale = 0.4;
		bullyGroup.add(bully);
		//bully.debug = true;
		bully.setCollider("rectangle", 0, 0, 300, 400);
		bully.velocityX = -(6 + score/100);

		

	}

}

function SpawnApple(){
	if(frameCount % 482 == 0){
		apple = createSprite(1300, random(150, 650));
		apple.addImage(appleImg);
		apple.lifetime = 200;
		apple.scale = 0.1;
		appleGroup.add(apple);
		//apple.debug = true;
		apple.velocityX = -(6 + score/100);


	}
}

function SpawnMess(){
	if(frameCount % 399 == 0){
		mess = createSprite(1300, 650);
		mess.addImage(messImg);
		mess.lifetime = 200;
		mess.scale = 0.3;
		messGroup.add(mess);
		//mess.debug = true;
		mess.velocityX = -(6 + score/100);

		

	

	}


}

