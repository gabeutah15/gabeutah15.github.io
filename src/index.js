import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mario from "./assets/mario.png";

var config = {
    type: Phaser.AUTO,
	autoCenter: true,
    width: 1000,
    height: 1280,
    backgroundColor: '#1b1464',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
			gravity: { x: 0, y:1  },
			debug: true
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var ball;
let playerTouchingGround = false;
let playerTouchingLadder = false;
let playerHitByBall = false;

var game = new Phaser.Game(config);

function preload ()
{	 
    this.load.image("background", 'src/assets/waterbg.jpg'); 
    this.load.image("enemy", 'src/assets/donkeykong.jpg'); 
    this.load.image("ground", 'src/assets/donkeykongplatform.jpg'); 
    this.load.image("block", 'src/assets/tile43.png'); 
    this.load.image('ball', 'src/assets/ball.png');
    this.load.image('ladder', 'src/assets/ladder.png');


	this.load.spritesheet('player', 'src/assets/marioSmallspritesheet.png', {
		frameWidth: 32,
		frameHeight: 32,
		margin: 1,
		spacing: 1
    });

}

function create ()
{
	this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
	this.bg = this.add.sprite(0,0 , 'background');
    //this.bg.setDisplaySize(this.bg.width*2, this.bg.height*3);
    this.bg.setDisplaySize(1000, 1280);
    this.bg.setScale(3,2);

    var cat1 = this.matter.world.nextCategory();
    var cat2 = this.matter.world.nextCategory();
	
    player = this.matter.add.sprite(1000, 1110, 'player', 0);
    player.label = "player1";
    player.setFriction(10);
    player.setCollidesWith([cat1]);
    //player.setOverlapsWith([cat2]);
    //player.sett
    

	//this.cameras.main.setSize(this.bg.width, 730);
    this.cameras.main.setSize(1000,1280);
	this.cameras.main.setBounds(0, 0, this.bg.width, this.bg.height);
	//this.cameras.main.startFollow(this.player);
	
	this.anims.create({
        key: 'walk',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('player', {start:4,end:5})
    });
    this.anims.create({
        key: 'jump',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('player', { start: 1, end: 1 })
    });
    this.anims.create({
        key: 'idle',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('player', { start: 0, end: 0 })
    });
	player.play('idle');

    //var ladder = this.add.image(890, 1120, 'ladder');
    var ladder = this.matter.add.image(890, 1120, 'ladder', null, { isStatic: true });
    ladder.setScale(.25, .25);
    ladder.setSensor(true);
    //this.matter.add.overlap(player, ladder);
    //ladder.setFriction(0);


	var ground = this.matter.add.image(500, 1200, 'ground', null, { isStatic: true });
	    ground.setScale(2.5, 0.7);
    ground.setFriction(0);
    

    var ground2 = this.matter.add.image(450, 650, 'ground', null, { isStatic: true });
	    ground2.setScale(1.8, 0.3);
    ground2.setAngle(7);
    

    //ground2.setFriction(100000000000);	

    var ground3 = this.matter.add.image(550, 850, 'ground', null, { isStatic: true });
    ground3.setScale(1.8, 0.3);
    ground3.setAngle(-7);
    //ground3.setFriction(100000000000);	

    var ground4 = this.matter.add.image(450, 1050, 'ground', null, { isStatic: true });
    ground4.setScale(1.8, 0.3);
    ground4.setAngle(7);
    //ground4.setFriction(100000000000);	
		
	var ground5 = this.matter.add.image(400, 300, 'ground', null, { isStatic: true });
	    ground5.setScale(.7, 0.3);
    ground5.setFriction(0);

    var ground6 = this.matter.add.image(1000, 720, 'ground', null, { isStatic: true });
    ground6.setScale(.1, 2);
    ground6.setFriction(0);

    var ground7 = this.matter.add.image(10, 900, 'ground', null, { isStatic: true });
    ground7.setScale(.1, 2);
    ground7.setFriction(0);

    //there has to be a smarter way to do this:
    ground.setCollisionCategory(cat1);
    ground2.setCollisionCategory(cat1);
    ground3.setCollisionCategory(cat1);
    ground4.setCollisionCategory(cat1);
    ground5.setCollisionCategory(cat1);
    ground6.setCollisionCategory(cat1);
    ground7.setCollisionCategory(cat1);
    ladder.setCollisionCategory(cat1);
   


    //no tilesprite for matter?
    //var platform = this.matter.add.tileSprite(800, 800, 43, 2 * 43, 'block');
    //this.physics.add.existing(platform, true);
    //this.platforms.add(platform);

    //this.matter.world.on('collisionstart', function (event, this.player, this.platforms) {
    //    if (this.keySpace.isDown) {
    //        this.player.setVelocityY(-120);
    //    }
    //}

    ball = this.matter.add.image(50, 50, 'ball');
    ball.setCircle();
    ball.setScale(.1);
    ball.setFriction(0);
    ball.setBounce(0.01);
    ball.setVelocity(0, 0);
    ball.setVelocityX(0);
    ball.setVelocityY(0);
    ball.setAngularVelocity(0.15);
    ball.setCollisionCategory(cat1);
    ball.label = "ball";


    //this doesn't work, but want something like it for 'ball' player collision to kill player
    //this.player.setOnCollideWith(ball, pair => {
    //    console.log("hit ball");
    //});

    //this.matter.world.on('collisionactive', function (event, ball/*, player*/) {
    //    ball.gameObject.setTint(0x00ff00);//0xff0000
    //    //player.gameObject.setTint(0x00ff00);//0x00ff00

    //});

    //this.matter.world.on('collisionstart', function (event, ball/*, player*/) {
    //    ball.gameObject.setTint(0x00ff00);//0xff0000
    //    //player.gameObject.setTint(0x00ff00);//0x00ff00

    //});

    //this.matter.world.on('collisionend', function (event, ball/*, player*/) {
    //    ball.gameObject.setTint(0x00ff00);//0xff0000
    //    //player.gameObject.setTint(0x00ff00);//0x00ff00

    //});

    //this.matter.world.on('collisionactive', function (event, ground, player) {
    //    playerTouchingGround = true;
    //});

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        //console.log(bodyB.gameObject.texture.key);
        //console.log(bodyA.gameObject.texture.key);

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ground')) {
            playerTouchingGround = true;
        }

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ball')) {
            playerHitByBall = true;
        }

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
            playerTouchingLadder = true;
            console.log("overlap with ladder");
        }
    });

    this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ground')) {
            playerTouchingGround = false;
        }

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
            playerTouchingLadder = false;
            console.log("stopped overlap with ladder");
        }
    });

    //dunno if overlap exists like this
    //this.matter.world.on('collisionactive', function (event, bodyA, bodyB) {
    //    if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
    //        playerTouchingLadder = true;
    //        console.log("overlap with ladder");
    //    }
    //});

    //this.matter.world.on('overlapend', function (event, bodyA, bodyB) {

    //    if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
    //        playerTouchingLadder = false;
    //        console.log("overlap with ladder end");
    //    }
    //});
    //this.matter.world.on('overlap', function (event, bodyA, bodyB) {
    //    console.log(bodyB.gameObject.texture.key);
    //    console.log(bodyA.gameObject.texture.key);

    //    if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
    //        playerTouchingLadder = true;
    //    }
    //});
    //adfg
    //this.matter.world.on('collisionstart', function (event, ladder, player) {
    //    playerTouchingLadder = true;
    //    console.log("touching ladder");
    //});

    //this.matter.world.on('collisionend', function (event, ladder, player) {
    //    playerTouchingLadder = false;
    //    console.log("NOT touching ladder");//
    //});

    //this.matter.world.on("collisionactive", (player, ground) => {
    //    playerTouchingGround = true;
    //});
    
}	

var delay = 1000;
var lastClick = Date.now();

function update() {

    //what is physics equivalent of this:
    //if (this.matter.collide(this.player, this.platforms)) {
    //    if (this.keySpace.isDown) {
    //        this.player.setVelocityY(-120);
    //    }
    //}
	
	player.setAngle(0);
	
	if(player.x <= 17){
		player.x = 17;
	}
	
	if(player.x >= 980){
		player.x = 980;
	}
	
	//if (this.keySpace.isDown && (lastClick <= (Date.now() - delay))) {
 //       //console.log('s is pressed');
 //       this.player.setVelocityY(-7);
 //       lastClick = Date.now();
 //   }

    if (this.keySpace.isDown && playerTouchingGround) {
        player.setVelocityY(-7);
        //playerTouchingGround = false;
        lastClick = Date.now();
    }

    if (this.keyW.isDown && playerTouchingLadder) {
        console.log('W is pressed');
        player.setVelocityY(-2);
		player.setVelocityX(0);
        //player.flipX = true;
        player.play('idle', true);
    }
    else if (this.keyA.isDown) {
        console.log('A is pressed');
        player.setVelocityX(-2);
        player.flipX = true;
        player.play('walk', true);

       
    }
    else if (this.keyD.isDown) {
        console.log('D is pressed');
        player.setVelocityX(2);
        player.flipX = false;
        player.play('walk', true);
    }
    else {
        player.play('idle');
		player.setVelocityX(0)
	}
	
}