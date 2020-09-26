import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mario from "./assets/mario.png";



var player;
var explosion;
var ball;
var endMine;
let playerTouchingGround = false;
let playerTouchingLadder = false;
let playerHitByBall = false;
let spawnAFireMonster = false;
let playerHasHammer = false;
let chainBitten = false;
//path
var follower;
var followers;
var balls;
var path;
var graphics;
//end path

var gameScene = new Phaser.Scene("game");
var titleScene = new Phaser.Scene("title");
//game.scene.add();

gameScene.preload = function() {
    console.log(this);

   

    this.load.image("background", 'src/assets/BackgroundAssets/SharkBomberBackground.png');
    this.load.image("Chain", 'src/assets/BackgroundAssets/Asset_chain.png');
	this.load.image("Boat", 'src/assets/Boat_2.png');
    this.load.image("DestroyBallBox", 'src/assets/BritneySpearsBarrel.png');
    this.load.image("enemy", 'src/assets/donkeykong.jpg');
    this.load.image("ground", 'src/assets/BackgroundAssets/BG_Base.png');
    this.load.image("platform", 'src/assets/BackgroundAssets/BG_Platform01.png');
    this.load.image("platform2", 'src/assets/BackgroundAssets/BG_Platform02.png');
    this.load.image("platform3", 'src/assets/BackgroundAssets/BG_Platform03.png');
    this.load.image("platform4", 'src/assets/BackgroundAssets/BG_Platform04.png');
    this.load.image('ball', 'src/assets/BackgroundAssets/Asset_bomb.png');
    this.load.image('endMine', 'src/assets/BackgroundAssets/Asset_bomb_Lg.png');

    this.load.image('ladderImage', 'src/assets/BackgroundAssets/Asset_Bubbles.png');
    this.load.image('chain', 'src/assets/BackgroundAssets/Asset_Chain.png');
    this.load.image('BGRocks', 'src/assets/BackgroundAssets/BG_BG01.png');
    this.load.image('BGRocks2', 'src/assets/BackgroundAssets/BG_BG02.png');
    this.load.image('rock', 'src/assets/BackgroundAssets/Bg_Rock01.png');
    this.load.image('rock2', 'src/assets/BackgroundAssets/Bg_Rock02.png');
    this.load.image('rock3', 'src/assets/BackgroundAssets/Bg_Rock03.png');
    this.load.image('rock4', 'src/assets/BackgroundAssets/Bg_Rock04.png');
    this.load.image('rock5', 'src/assets/BackgroundAssets/Bg_Rock05.png');

    //this.load.image("block", 'src/assets/tile43.png');
    this.load.image('ladder', 'src/assets/ladder.png');

    this.load.image('firesprite', 'src/assets/smallfiresprite.png');
    this.load.image('hammer', 'src/assets/sword.png');

	//TODO: this prob needs to be edited
    this.load.spritesheet('fishermen', 'src/assets/fishermenSheet.png', {
        frameWidth: 34.5,//100 or 101 or 100.666
        frameHeight: 51,
        margin: 1,
        spacing: 1
    });

    this.load.spritesheet('goop', 'src/assets/GOOP.png', {
        frameWidth: 34.5,//100 or 101 or 100.666
        frameHeight: 51,
        margin: 1,
        spacing: 1
    });

    this.load.audio('song', ['src/assets/sounds/Baby Shark.mp3']);
    this.load.audio('deathSound', ['src/assets/sounds/deathsong.wav']);
    this.load.audio('explosionSound', ['src/assets/sounds/explosionsound.mp3']);


    //this.load.image('player', 'src/assets/shark.png');
    this.load.spritesheet('player', 'src/assets/SharkSpriteSheet_3.png', {
        frameWidth: 119,//100 or 101 or 100.666
        frameHeight: 77,
        margin: 1,
        spacing: 1
    });

  
    this.load.spritesheet('explosion', 'src/assets/explosion.png', {
        frameWidth: 120,//127 these values all need adjusting
        frameHeight: 115,//120
        margin: 12,
        spacing: 10
    }); //39 frames?
}

var music;
var deathSound;
var explosionSound;

function bodyIsPlatform(body) {
    if (body.gameObject != null && ((body.gameObject.texture.key == 'ground') ||
        (body.gameObject.texture.key == 'platform') ||
        (body.gameObject.texture.key == 'platform2') ||
        (body.gameObject.texture.key == 'ladder') ||
        (body.gameObject.texture.key == 'platform3') ||
        (body.gameObject.texture.key == 'platform4'))) {
        return true;
    }
    else {
        return false;
    }
}

gameScene.create = function () {
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    var text = this.add.text(800, 1100, game.loop.actualFps);
    text.setDepth(100);

    music = this.sound.add('song');
    music.stop();
    music.play();
    music.setVolume(.1);
    deathSound = this.sound.add('deathSound');
    explosionSound = this.sound.add('explosionSound');

    this.bg = this.add.sprite(500, 900, 'background');
    //this.bg.setDisplaySize(this.bg.width*2, this.bg.height*3);
    //this.bg.setDisplaySize(1000, 1280);
    this.bg.setScale(3, 5.5);

    this.bgRock2 = this.add.sprite(500, 900, 'BGRocks2');
    //this.bg.setDisplaySize(this.bg.width*2, this.bg.height*3);
    //this.bg.setDisplaySize(1000, 1280);
    this.bgRock2.setScale(1, 1.5);
    this.bgRock2.tint = 0x00065e;

    this.bgRock1 = this.add.sprite(500, 900, 'BGRocks');
    this.bgRock1.tint = 0x252da1;
    //this.bg.setDisplaySize(this.bg.width*2, this.bg.height*3);
    //this.bg.setDisplaySize(1000, 1280);

    //this.bg = this.add.sprite(0, 0, 'background');

    this.cat1 = this.matter.world.nextCategory();
    this.cat2 = this.matter.world.nextCategory();

    //final pos:
    var playerX = 880;
    var playerY = 1120;

    //test pos
    //var playerX = 300;
    //var playerY = -300;

    player = this.matter.add.sprite(playerX, playerY, 'player', 0);
    player.label = "player";
    player.setFriction(10);
    player.setScale(1, 1);
    player.setCircle(35);
    player.setCollidesWith([this.cat1]);

    explosion = this.matter.add.sprite(200, -500, 'explosion', 0); //600, 1100,
    explosion.setSensor(true);
    explosion.setIgnoreGravity(true);
    explosion.setScale(3);
    explosion.setDepth(100);
    explosion.setVisible(false);

    this.cameras.main.setSize(1000, 730);
    this.cameras.main.setBounds(0, -1000, 1000, 10000);
    this.cameras.main.startFollow(player);
    //var ball1 = this.add.image(50, 50, 'ball');
    //var ball2 = this.add.image(300, -150, 'ball');
    //var ball3 = this.add.image(750, -150, 'ball');

    //maybe try using the following in update:
    //this.cameras.main.scrollX = this.cameraTargetSprite.x - 400;
    //this.cameras.main.scrollY = this.cameraTargetSprite.y - 300;

    this.anims.create({
        key: 'walk',
        repeat: -1,//infinite repeat
        frameRate: 8,
        frames: this.anims.generateFrameNames('player', { start: 0, end: 4 })
    });
    this.anims.create({
        key: 'idle',
        repeat: -1,//infinite repeat
        frameRate: 4,
        frames: this.anims.generateFrameNames('player', { start: 0, end: 3 })
    });
    this.anims.create({//this is just also swimming?
        key: 'jump',
        repeat: -1,//infinite repeat
        frameRate: 10,
        frames: this.anims.generateFrameNames('player', { start: 0, end: 3 })
    });
    this.anims.create({
        key: 'sword',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('player', { start: 5, end: 7 })
    });
    this.anims.create({
        key: 'death',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('player', { start: 5, end: 5 })//not sure about frame numbers for win and death
    });
    this.anims.create({
        key: 'win',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('player', { start: 4, end: 4 })
    });
    this.anims.create({
        key: 'goopAnim',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('goop', { start: 0, end: 4 })//maybe 5?
    });
    this.anims.create({
        key: 'explode',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('explosion', { start: 0, end: 39 })//maybe 5?
    });
    //explosion.play('explode');
    player.play('idle');
    console.log(this.anims);

	this.anims.create({
        key: 'GOOPAnim',
        repeat: -1,//infinite repeat
        frameRate: 5,
        frames: this.anims.generateFrameNames('Goop', { start: 0, end: 4 })
    });

	//platforms and ground
    var ground = this.matter.add.image(500, 1280, 'ground', null, { isStatic: true });
		ground.setScale(1, 1.5);
		ground.setAngle(1);
		ground.setCollisionCategory(this.cat1);

	//starts from bottom - A is on left
	var level1A = this.matter.add.image(50, 1100, 'platform3', null, { isStatic: true });
		level1A.setScale(1, 1);
		level1A.setAngle(-4);
		level1A.setCollisionCategory(this.cat1);
	
	var ladder1A = this.matter.add.image(185, 1135, 'ladderImage', null, { isStatic: true });
		ladder1A.setScale(1.2, 1.6);
		ladder1A.setSensor(true);

	var ladderT1A = this.matter.add.image(190, 1110, 'ladder', null, { isStatic: true });
		ladderT1A.setScale(.01, .45).setVisible(false);
		ladderT1A.setSensor(true);
		ladderT1A.setCollisionCategory(this.cat1);
	
	var level1B = this.matter.add.image(340, 1080, 'platform4', null, { isStatic: true });
		level1B.setScale(2, 1.3);
		level1B.setScale(2, 1.3);
		level1B.setAngle(-4);
		level1B.setCollisionCategory(this.cat1);

	var ladder1B = this.matter.add.image(510, 1130, 'ladderImage', null, { isStatic: true });
		ladder1B.setScale(1.8, 1.99);
		ladder1B.setSensor(true);

	var ladderT1B = this.matter.add.image(525, 1095, 'ladder', null, { isStatic: true });
		ladderT1B.setScale(.01, .5).setVisible(false);
		ladderT1B.setSensor(true);
		ladderT1B.setCollisionCategory(this.cat1);
	
	var level1C = this.matter.add.image(800, 1050, 'platform2', null, { isStatic: true });
		level1C.setScale(1.5, 1);
		level1C.setAngle(-4);
		level1C.setCollisionCategory(this.cat1);
		
	var level2A = this.matter.add.image(50, 900, 'platform3', null, { isStatic: true });
		level2A.setScale(1.7, 1);
		level2A.setAngle(5);
		level2A.setCollisionCategory(this.cat1);

	var ladder2A = this.matter.add.image(250, 970, 'ladderImage', null, { isStatic: true });
		ladder2A.setScale(1.2, 1.6);
		ladder2A.setSensor(true);
	
	var ladderT2A = this.matter.add.image(243, 940, 'ladder', null, { isStatic: true });
		ladderT2A.setScale(.01, .4).setVisible(false);
		ladderT2A.setSensor(true);
		ladderT2A.setCollisionCategory(this.cat1);
		
	var ladder2B = this.matter.add.image(720, 910, 'ladderImage', null, { isStatic: true });
		ladder2B.setScale(1.8, 2.4);
		ladder2B.setSensor(true);
		
	var ladderT2B = this.matter.add.image(710, 895, 'ladder', null, { isStatic: true });
		ladderT2B.setScale(.01, .7).setVisible(false);
		ladderT2B.setSensor(true);
		ladderT2B.setCollisionCategory(this.cat1);

	var level3A = this.matter.add.image(400, 790, 'platform', null, { isStatic: true });
		level3A.setScale(1.1, 1);
		level3A.setAngle(7);
		level3A.setCollisionCategory(this.cat1);

	var ladder3A = this.matter.add.image(550, 680, 'ladderImage', null, { isStatic: true });
		ladder3A.setScale(1.5, 2.2);
		ladder3A.setSensor(true);
		
	var ladderT3A = this.matter.add.image(560, 655, 'ladder', null, { isStatic: true });
		ladderT3A.setScale(.01, .62).setVisible(false);
		ladderT3A.setSensor(true);
		ladderT3A.setCollisionCategory(this.cat1);
		
	var level3B = this.matter.add.image(900, 850, 'platform4', null, { isStatic: true });
		level3B.setScale(2, 1);
		level3B.setAngle(7);
		level3B.setCollisionCategory(this.cat1);	
	
	var level4A = this.matter.add.image(300, 620, 'platform2', null, { isStatic: true });
		level4A.setScale(1.3, 1);
		level4A.setAngle(-5);
		level4A.setCollisionCategory(this.cat1);

	var ladder4A = this.matter.add.image(350, 460, 'ladderImage', null, { isStatic: true });
		ladder4A.setScale(1.5, 2.4);
		ladder4A.setSensor(true);
		
	var ladderT4A = this.matter.add.image(335, 440, 'ladder', null, { isStatic: true });
		ladderT4A.setScale(.01, .75).setVisible(false);
		ladderT4A.setSensor(true);
		ladderT4A.setCollisionCategory(this.cat1);
			 
	var level4B = this.matter.add.image(820, 570, 'platform', null, { isStatic: true });
		level4B.setScale(1, 1);
		level4B.setAngle(-5);
		level4B.setCollisionCategory(this.cat1);

	var ladder4B = this.matter.add.image(880, 460, 'ladderImage', null, { isStatic: true });
		ladder4B.setScale(1.5, 1.5);
		ladder4B.setSensor(true);
		
	var ladderT4B = this.matter.add.image(870, 450, 'ladder', null, { isStatic: true });
		ladderT4B.setScale(.01, .4).setVisible(false);
		ladderT4B.setSensor(true);
		ladderT4B.setCollisionCategory(this.cat1);

	var level5A = this.matter.add.image(100, 330, 'platform2', null, { isStatic: true });
		level5A.setScale(1.3, 1);
		level5A.setAngle(7);
		level5A.setCollisionCategory(this.cat1);
		
	var ladder5A = this.matter.add.image(700, 240, 'ladderImage', null, { isStatic: true });
		ladder5A.setScale(1.5, 2.7);
		ladder5A.setSensor(true);
		
	var ladderT5A = this.matter.add.image(160, 218, 'ladder', null, { isStatic: true });
		ladderT5A.setScale(.01, .42).setVisible(false);
		ladderT5A.setSensor(true);
		ladderT5A.setCollisionCategory(this.cat1);
			 
	var level5B = this.matter.add.image(620, 400, 'platform3', null, { isStatic: true });
		level5B.setScale(2.3, 1);
		level5B.setAngle(7);
		level5B.setCollisionCategory(this.cat1);

	var ladder5B = this.matter.add.image(150, 240, 'ladderImage', null, { isStatic: true });
		ladder5B.setScale(1.5, 1.6);
		ladder5B.setSensor(true);
		
	var ladderT5B = this.matter.add.image(710, 220, 'ladder', null, { isStatic: true });
		ladderT5B.setScale(.01, .8).setVisible(false);
		ladderT5B.setSensor(true);
		ladderT5B.setCollisionCategory(this.cat1);

	var level6A = this.matter.add.image(50, 200, 'platform4', null, { isStatic: true });
		level6A.setScale(1, 1);
		level6A.setAngle(-5);
		level6A.setCollisionCategory(this.cat1);
		
	var ladder6A = this.matter.add.image(455, 20, 'ladderImage', null, { isStatic: true });
		ladder6A.setScale(1.5, 2.5);
		ladder6A.setSensor(true);
		
	var ladderT6A = this.matter.add.image(440, 0, 'ladder', null, { isStatic: true });
		ladderT6A.setScale(.01, .65).setVisible(false);
		ladderT6A.setSensor(true);
		ladderT6A.setCollisionCategory(this.cat1);
			 
	var level6B = this.matter.add.image(420, 170, 'platform2', null, { isStatic: true });
		level6B.setScale(1.5, 1);
		level6B.setAngle(-5);
		level6B.setCollisionCategory(this.cat1);
			 
	var ladder6B = this.matter.add.image(850, 30, 'ladderImage', null, { isStatic: true });
		ladder6B.setScale(1, 1.4);
		ladder6B.setSensor(true);
		
	var ladderT6B = this.matter.add.image(845, 10, 'ladder', null, { isStatic: true });
		ladderT6B.setScale(.01, .4).setVisible(false);
		ladderT6B.setSensor(true);
		ladderT6B.setCollisionCategory(this.cat1);

	var level6C = this.matter.add.image(900, 120, 'platform3', null, { isStatic: true });
		level6C.setScale(1.5, 1);
		level6C.setAngle(-5);
		level6C.setCollisionCategory(this.cat1);
		
	var level7A = this.matter.add.image(200, -100, 'platform', null, { isStatic: true });
		level7A.setScale(.9, 1);
		level7A.setAngle(7);
		level7A.setCollisionCategory(this.cat1);
			 
	var level7B = this.matter.add.image(670, -40, 'platform', null, { isStatic: true });
		level7B.setScale(.7, 1);
		level7B.setAngle(7);
		level7B.setCollisionCategory(this.cat1);

	var LBumper = this.matter.add.image(3, 1000, 'platform', null, { isStatic: true });
		LBumper.setScale(.01, 1000);
		LBumper.setCollisionCategory(this.cat1);
		
	var RBumper = this.matter.add.image(997, 1000, 'platform', null, { isStatic: true });
		RBumper.setScale(.01, 1000);
		RBumper.setCollisionCategory(this.cat1);

	var hammer = this.matter.add.image(70, 800, 'hammer', null, { isStatic: true });
		hammer.setScale(.7, .7);
		hammer.setSensor(true);
		hammer.setCollisionCategory(this.cat1);
		
	var DestroyBallBox = this.matter.add.image(930, 1190, 'DestroyBallBox', null, { isStatic: true });
		DestroyBallBox.setScale(1.7, 1.7);
		DestroyBallBox.setSensor(true);

	var Chain = this.matter.add.image(150, -183, 'Chain', null, { isStatic: true });
		Chain.setScale(.8, .8);
		Chain.setSensor(true);
		Chain.setCollisionCategory(this.cat1);
		
    endMine = this.matter.add.image(150, -265, 'endMine', null, { isStatic: true });
		endMine.setScale(.8, .8);
		//endMine.setSensor(true);
		endMine.setCollisionCategory(this.cat1);
    //endMine.setCollidesWith([this.cat2]);
		
	var boat = this.matter.add.image(170, -550, 'Boat', null, { isStatic: true });
		boat.setScale(1, 1);
		//boat.setSensor(true);
		boat.setCollisionCategory(this.cat1);

	//this.cameras.main.startFollow(Chain);

    //ball = this.matter.add.image(70, -300, 'ball');
    //console.log(ball);
    //ball.setCircle();
    //ball.setScale(.45);
    //ball.setFriction(0);
    //ball.setBounce(0.04);
    //ball.setVelocity(0, 0);
    //ball.setVelocityX(0);
    //ball.setVelocityY(0);
    //ball.setAngularVelocity(0.15);
    //ball.setCollisionCategory(this.cat1);
    //ball.label = "ball";
    //balls.add(ball);

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        //console.log(bodyB.gameObject.texture.key);
        //console.log(bodyA.gameObject.texture.key);

        let aIsPlatform = bodyIsPlatform(bodyA);
        let bIsPlatform = bodyIsPlatform(bodyB);

        if ((bodyA.gameObject.texture.key == 'player') && bIsPlatform) {
            playerTouchingGround = true;
        }
        if (aIsPlatform && (bodyB.gameObject.texture.key == 'player')) {
            playerTouchingGround = true;
        }
        //if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'platform')) {
        //    playerTouchingGround = true;
        //}
        //if ((bodyA.gameObject.texture.key == 'platform') && (bodyB.gameObject.texture.key == 'player')) {
        //    playerTouchingGround = true;
        //}


        //ball touching ground
        if (/*bodyA.gameObject != null && */bodyB.gameObject != null) {
            //if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ground')) {
            //    bodyA.gameObject.label = 'ballGrounded';
            //    console.log("lable set to ballGrounded")
            //}
            if (bIsPlatform && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.label = 'ballGrounded';
                console.log("lable set to ballGrounded")
            }
            //if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'platform')) {
            //    bodyA.gameObject.label = 'ballGrounded';
            //    console.log("lable set to ballGrounded")
            //}
            if (aIsPlatform && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.label = 'ballGrounded';
                console.log("lable set to ballGrounded")
            }
        }
        //end ball touching ground//b was endmine when A was player, boat was B when A was player
        if (bodyA.gameObject.texture.key == 'endMine' || bodyB.gameObject.texture.key == 'endMine') {
            console.log(bodyA.gameObject);
            console.log(bodyB.gameObject);

        }
        if (bodyB.gameObject.texture.key == 'Boat' || bodyA.gameObject.texture.key == 'Boat') {
            console.log(bodyA.gameObject);
            console.log(bodyB.gameObject);

        }

   //     if ((bodyA.gameObject.texture.key == 'endMine') && (bodyB.gameObject.texture.key == 'Boat')) {
   //         player.play('win');
   //         explosion.play('explode');

   //         setTimeout(function () {
   //             alert("YOU WIN!!!");
   //             music.stop();
   //             location.reload();
   //         }, 2000);

   //         //alert("YOU WIN!!!");
			////bodyA.destroy();
   //     }

        //if ((bodyB.gameObject.texture.key == 'endMine') && (bodyA.gameObject.texture.key == 'Boat')) {
        //    player.play('win');
        //    explosion.play('explode');

        //    setTimeout(function () {
        //        alert("YOU WIN!!!");
        //        music.stop();
        //        location.reload();
        //    }, 2000);


        //    //alert("YOU WIN!!!");
        //    //bodyB.destroy();
        //}

        if ((bodyA.gameObject.texture.key == 'DestroyBallBox') && (bodyB.gameObject.texture.key == 'ball')) {
            //console.log("Ball Destroyed, fire monster spawned");
            spawnAFireMonster = true;
            bodyB.gameObject.setActive(false).setVisible(false);
            bodyB.destroy();
        }

		if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'Chain')) {
            console.log("Chain bitten");
			chainBitten = true;
        }
		

        if (bodyB.gameObject != null) {

            if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
                playerTouchingLadder = true;
                console.log("overlap with ladder");
            }

            if ((bodyA.gameObject.texture.key == 'ladder') && (bodyB.gameObject.texture.key == 'ball')) {
                var r = Math.floor(Math.random() * 10);

                //bodyB.gameObject.applyForce(new Phaser.Math.Vector2(100, 100))

                if (r > 4) {
                    //ball.setVelocityY(0);
                    bodyB.gameObject.setVelocityY(5)
                    bodyB.gameObject.setVelocityX(0)
                    bodyB.gameObject.setIgnoreGravity(true);

                }
                console.log("Ball hit ladder " + r);
            }
        }
        if (bodyA.gameObject != null) {
            if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ladder')) {
                var r = Math.floor(Math.random() * 10);

                //bodyA.gameObject.applyForce(new Phaser.Math.Vector2(100,100))

                if (r > 4) {
                    //ball.setVelocityY(0);
                    bodyA.gameObject.setVelocityY(5)//this might not do anything
                    bodyA.gameObject.setVelocityX(0)
                    bodyA.gameObject.setIgnoreGravity(true);

                }
                console.log("Ball hit ladder " + r);
            }
        }
        if (bodyB.gameObject != null) {
            if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ball')) {
                if (playerHasHammer) {
                    console.log('player rekt barrel')
                    bodyB.gameObject.setActive(false).setVisible(false);
                    bodyB.destroy();
                }
                else {
                    music.stop();
                    deathSound.play();
                    player.play('death');
                    alert("you lost!!!");
                    //this.scene.restart();
                    //game.scene.start('game');
                    //game.scene.restart('game');
                    //gameScene.restart();
                    location.reload();
                }
            }
        }
        if ((bodyA.gameObject.texture.key == 'player') && !playerHasHammer && (bodyB.gameObject.texture.key == 'hammer')) {
            console.log('stop, hammertime');
            playerHasHammer = true;
            hammerTime = Date.now();
            bodyB.gameObject.setActive(false).setVisible(false);
            console.log('test');
            bodyB.destroy();
        }


    });

    this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
        let aIsPlatform = bodyIsPlatform(bodyA);
        let bIsPlatform = bodyIsPlatform(bodyB);

        if (!playerHasHammer) {
            if ((bodyA.gameObject.texture.key == 'player') && bIsPlatform) {
                playerTouchingGround = false;
            }
            if ((bodyA.gameObject.texture.key == 'player') && bIsPlatform) {
                playerTouchingGround = false;
            }

            if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
                playerTouchingLadder = false;
                console.log("stopped overlap with ladder");
            }
            if ((bodyA.gameObject.texture.key == 'ladder') && (bodyB.gameObject.texture.key == 'player')) {
                playerTouchingLadder = false;
                console.log("stopped overlap with ladder");
            }
        }


        //ball touching ground
        if (/*bodyA.gameObject != null && */bodyB.gameObject != null) {
            //if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ground')) {
            //    bodyA.gameObject.label = 'ball';
            //    console.log("lable set back to ball")
            //}
            if (aIsPlatform && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.label = 'ball';
                console.log("lable set back to ball")

            }
            //if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'platform')) {
            //    bodyA.gameObject.label = 'ball';
            //    console.log("lable set back to ball")

            //}
            if (aIsPlatform && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.label = 'ball';
                console.log("lable set back to ball")

            }
        }
        //end ball touching ground


        if (bodyB.gameObject != null) {
            if ((bodyA.gameObject.texture.key == 'ladder') && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.setIgnoreGravity(false);
                console.log("ball stopped hitting ladder");
            }
        }
        if (bodyA.gameObject != null) {
            if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ladder')) {
                bodyA.gameObject.setIgnoreGravity(false);
                console.log("ball stopped hitting ladder");
            }
        }
        if (bodyA.gameObject != null) {
            if ((bodyA.gameObject.texture.key == 'ball') && bIsPlatform) {
                bodyA.gameObject.setVelocityX(0);
                console.log("ball came off ground");
            }
        }
        if (bodyB.gameObject != null) {
            if (bodyB.gameObject != null) {
                if (aIsPlatform && (bodyB.gameObject.texture.key == 'ball')) {
                    bodyB.gameObject.setVelocityX(0);
                    console.log("ball came off ground B");
                }
            }
        }
    });//comment

    //path
    graphics = this.add.graphics();
    path = new Phaser.Curves.Path(950, 1080);
    path.lineTo(175, 1120);
    path.lineTo(175, 980);
    path.lineTo(750, 900);
    path.lineTo(750, 620);
    path.lineTo(20, 680);
    path.lineTo(20, 380);
    path.lineTo(970, 500);
    path.lineTo(970, 160);
    path.lineTo(145, 230);
    path.lineTo(145, -50);
    path.lineTo(970, 50);
    path.lineTo(970, -150);
    path.lineTo(170, -250);



    balls = this.add.group();

    followers = this.add.group();
    //followers = this.matter.add.group();

    //test goop section
    //for (var i = 0; i < 3; i++)
    //{
    //    var fireSprite = followers.create(0, -50, 'goop');
    //    fireSprite.play('goopAnim');
    //    fireSprite.setData('vector', new Phaser.Math.Vector2());

    //    this.tweens.add({
    //        targets: fireSprite,
    //        z: 1,
    //        ease: 'Sine.easeInOut',
    //        duration: 60000,
    //        yoyo: true,
    //        repeat: -1
    //    });

    //}
    //end test goop section

    //end path

}

var delay = 1000;
var lastClick = Date.now();
var rand = Math.floor(Math.random() * 1000);

var delayBall = 4000 + rand;//spawn frequency of ball
var lastBall = Date.now();

var hammerTime = Date.now();

let setTime = false;
var intialTime;

let playerDiedBool = false;

function playerDied() {
    music.stop();
    deathSound.play();
    player.play('death');
    alert("you lost!!!");
    //this.scene.restart();
    //game.scene.start('game');
    //gameScene.scene.restart();
    location.reload();
}

var hasPlayedBoom = false;

function boooooom() {

    if (!hasPlayedBoom) {
	    player.play('win');
        explosion.setVisible(true);
        explosion.play('explode');
        explosionSound.play();
        music.stop();
        hasPlayedBoom = true;
    }
}

function playerWon() {
    alert("YOU WIN!!!");
    
    location.reload();
}

gameScene.update = function () {
    //player.setIgnoreGravity(true);
    //player.setVelocityY(.27);
    //player.setVelocityX(0);
	
    if (chainBitten) {
        endMine.y -= 1;

        if (!setTime) {
            intialTime = Date.now();
			setTime = true;
       }

        if (setTime && (intialTime <= (Date.now() - 3300))) {
            boooooom();
            endMine.y += 1;
        }
		
		if (setTime && (intialTime <= (Date.now() - 7500))) {
            playerWon();
			setTime = false;
        }
    }

    player.setAngle(0);

    if (player.x <= 17) {
        player.x = 17;
    }
    if (player.x >= 980) {
        player.x = 980;
    }
    if (player.y < -500) {
        player.y = -500;
    }

    if (playerDiedBool) {
        return;
    }

    if (playerHasHammer && hammerTime <= (Date.now() - 10000)) {
        console.log(hammerTime);
        console.log(Date.now());
        playerHasHammer = false;
        console.log("end of hammerTime");
    }

    if (lastBall <= (Date.now() - delayBall)) {

        console.log("spawned ball");

        var randBall = Math.floor(Math.random() * 2);//working

        var xChange = 0;
        var yChange = 0;
      
        if (randBall == 0) {
            xChange = 50;
            yChange = -500;
        }
        else if (randBall == 1) {
            xChange = 660;
            yChange = -500;
        }

        ball = this.matter.add.image(xChange, yChange, 'ball');
        ball.setCircle();
        ball.setScale(.45);
        ball.setFriction(0);
        ball.setBounce(0.04);
        ball.setVelocity(0, 0);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
        ball.setAngularVelocity(0.15);
        ball.setCollisionCategory(this.cat1);
        ball.label = "ball";
        balls.add(ball);
        lastBall = Date.now();
    }

    if (playerTouchingLadder) {
        player.setIgnoreGravity(true);
        player.setVelocityY(0);
        player.setVelocityX(0);
    }
    else {
        player.setIgnoreGravity(false);
    }

    if (this.keySpace.isDown /*&& playerTouchingGround*/ && (lastClick <= (Date.now() - delay) && !playerHasHammer)) {
        player.setVelocityY(-3);
        lastClick = Date.now();
    }
    if (this.keyW.isDown && playerTouchingLadder && !playerHasHammer) {
        //console.log('W is pressed');
        //player.setVelocityY(-2);
        player.y -= 1.5;
        //player.setVelocityX(0);

        //player.flipX = true;
        player.play('idle', true);
    }
    else if (this.keyS.isDown && playerTouchingLadder && !playerHasHammer) {
        //player.setVelocityY(2);
        //player.y -= 1;
        player.y += .5;
        //player.setVelocityX(0);

        //player.flipX = true;
        player.play('idle', true);
    }

    else if (this.keyA.isDown && playerTouchingLadder && !playerHasHammer) {
        player.x -= 1;
        player.y -= .1;
        player.flipX = true;
        player.play('idle', true);
    }
    else if (this.keyD.isDown && playerTouchingLadder && !playerHasHammer) {
        player.x += 1;
        player.y -= .1;
        player.flipX = false;
        player.play('idle', true);
    }
    else if (playerTouchingLadder && !playerHasHammer) {
        player.y -= 1;
        player.play('idle', true);
    }
    //else if (playerTouchingLadder) {
    //    player.setVelocityY(0);
    //    player.play('idle', true);
    //}
    else if (this.keyA.isDown) {
        console.log('A is pressed');
        player.setVelocityX(-2);
        player.flipX = true;

        if (playerHasHammer) {
            player.play('sword', true);

        }
        else {
            player.play('walk', true);

        }
    }
    else if (this.keyD.isDown) {
        console.log('D is pressed');
        player.setVelocityX(2);
        player.flipX = false;

        if (playerHasHammer) {
            player.play('sword', true);

        }
        else {
            player.play('walk', true);

        }
    }
    else {
        //player.play('idle', true);

        if (playerHasHammer) {
            player.play('sword', true);

        }
        else {
            player.play('idle', true);

        }

        player.setVelocityX(0)
    }

    var bodies = this.matter.world.localWorld.bodies;
    bodies.forEach(body => {
        if (body.gameObject.texture.key == 'ball') {
            body.gameObject.setVelocityY(2)
        }
        if (body.gameObject.label == 'ballGrounded') {
            body.gameObject.setVelocityY(2)
        }
    });

    if (spawnAFireMonster) {

        //this.graphics = this.add.graphics();
        //follower = { t: 0, vec: new Phaser.Math.Vector2() };
        //this.matter.add.image
        //var fireSprite = followers.create(0, -50, 'Goop');

       

        //var fireSprite = followers.create(0, -50, 'firesprite');
        var fireSprite = followers.create(0, -50, 'goop');
        fireSprite.play('goopAnim');

        //followers.remove(followers[0], true, true);

        console.log(this.matter.world);
        


        fireSprite.setData('vector', new Phaser.Math.Vector2());
        //this works as in does not throw an error but not sure if it's the real label or just creates an ad hoc label key for the data manager:
        fireSprite.setData('label', 'firesprite');


        console.log("spawn fire monster");
        this.tweens.add({
            targets: fireSprite,
            z: 1,
            ease: 'Sine.easeInOut',
            duration: 60000,
            yoyo: true,
            repeat: -1
        });
        spawnAFireMonster = false;
    }
    //path:
    graphics.clear();
    graphics.lineStyle(1, 0x5ff5c3, .5);
    path.draw(graphics);

    //new
    //it is successfylly spawning a new one on each dead ball but they aren't going anywhere
    //looks like their path.getpoint never changes?
    var fireSprites = followers.getChildren();
    for (var i = 0; i < fireSprites.length; i++) {
        var t = fireSprites[i].z;
        var vec = fireSprites[i].getData('vector');

        //  The vector is updated in-place
        path.getPoint(t, vec);

        fireSprites[i].setPosition(vec.x, vec.y);

        fireSprites[i].setDepth(fireSprites[i].y);

        var vecMaxX = vec.x + 30;
        var vecMinX = vec.x - 30;
        var vecMaxY = vec.y + 30;
        var vecMinY = vec.y - 30;


        var playerX = player.x;
        var playerY = player.y;

        if ((playerX > vecMinX) && (playerX < vecMaxX)) {
            if ((playerY > vecMinY) && (playerY < vecMaxY)) {
                if (playerHasHammer) {
                    console.log("player has hammer - rekt the fire");
                    fireSprites[i].destroy();
                    return;
                }
                else {
                    console.log("player overlap with fires sprite");
                    playerDiedBool = true;
                    playerDied();
                }
            }
        }

        if (vec.y < -200) {
            followers.remove(fireSprites[i], true, true);
        }
    }
}

titleScene.preload = function () {
    //this.load.image('background', 'src/assets/mario.png');
    this.load.image("background", 'src/assets/BackgroundAssets/SharkBomberBackground.png');
};

titleScene.create = function () {
    this.bg = this.add.sprite(500, 900, 'background');
    this.bg.setScale(3, 5.5);
    this.bg.setOrigin(0, 0);//maybe?

    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    //var bg = this.add.sprite(0, 0, 'background');

    var text = this.add.text(100, 100, 'Angry Boat Man Game');
    var text = this.add.text(100, 200, 'Press Enter To Start');
    var text = this.add.text(100, 300, game.loop.actualFps);
    text.setDepth(100);

};

var startGame = false;

titleScene.update = function () {

    if (this.keyEnter.isDown && !startGame) {
        startGame = true;
        //game.scene.transition({ target: 'game', duration: 2000 });
        game.scene.start('game');
    }
};

var config = {
    type: Phaser.AUTO,
    autoCenter: true,
    width: 1000,
    height: 730,
    backgroundColor: '#1b1464',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: { x: 0, y: .15 },
            debug: true
        },
    },
    fps: {
        target: 50,
        forceSetTimeOut: false
    },
    //scene: {
    //    preload: preload,
    //    create: create,
    //    update: update
    //}
};
var game = new Phaser.Game(config);
game.scene.add('title', titleScene);
game.scene.add("game", gameScene);

game.scene.start('title');