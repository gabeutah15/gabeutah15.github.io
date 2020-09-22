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
            gravity: { x: 0, y: .15 },
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
let spawnAFireMonster = false;
let playerHasHammer = false;
//path
var follower;
var followers
var path;
var graphics;
//end path

var game = new Phaser.Game(config);
//game.scene.add();

function preload() {
    console.log(this);
    this.load.image("background", 'src/assets/waterbg.jpg');
    this.load.image("WinBox", 'src/assets/boat.png');
    this.load.image("DestroyBallBox", 'src/assets/DestroyBallBox.png');
    this.load.image("enemy", 'src/assets/donkeykong.jpg');
    this.load.image("ground", 'src/assets/BackgroundAssets/BG_Base.png');
    this.load.image("platform", 'src/assets/BackgroundAssets/BG_Platform01.png');
    this.load.image("block", 'src/assets/tile43.png');
    this.load.image('ball', 'src/assets/ball.png');
    this.load.image('ladder', 'src/assets/ladder.png');
    this.load.image('firesprite', 'src/assets/smallfiresprite.png');
    this.load.image('hammer', 'src/assets/hammer.png');

    this.load.audio('song', ['src/assets/sounds/backgroundsong2.mp3']);
    this.load.audio('deathSound', ['src/assets/sounds/deathsong.wav']);

	this.load.image('player', 'src/assets/shark.png');
    //this.load.spritesheet('player', 'src/assets/marioSmallspritesheet.png', {
    //    frameWidth: 32,
    //    frameHeight: 32,
    //    margin: 1,
    //    spacing: 1
    //});

}

var music;
var deathSound;

function create() {
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    music = this.sound.add('song');
    music.stop();
    music.play();
    deathSound = this.sound.add('deathSound');

    this.bg = this.add.sprite(0, 0, 'background');
    //this.bg.setDisplaySize(this.bg.width*2, this.bg.height*3);
    this.bg.setDisplaySize(1000, 1280);
    this.bg.setScale(3, 2);

    this.cat1 = this.matter.world.nextCategory();
    var cat2 = this.matter.world.nextCategory();

    player = this.matter.add.sprite(100, 1110, 'player', 0);
    player.label = "player1";
    player.setFriction(10);
	player.setScale(.4, .4);
    player.setCollidesWith([this.cat1]);
    //player.setOverlapsWith([cat2]);    

    //this.cameras.main.setSize(this.bg.width, 730);
    this.cameras.main.setSize(1000, 1280);
    this.cameras.main.setBounds(0, 0, this.bg.width, this.bg.height);
    //this.cameras.main.startFollow(this.player);

    //this.anims.create({
    //    key: 'walk',
    //    repeat: -1,//infinite repeat
    //    frameRate: 6,
    //    frames: this.anims.generateFrameNames('player', { start: 4, end: 5 })
    //});
    //this.anims.create({
    //    key: 'jump',
    //    repeat: -1,//infinite repeat
    //    frameRate: 6,
    //    frames: this.anims.generateFrameNames('player', { start: 1, end: 1 })
    //});
    //this.anims.create({
    //    key: 'idle',
    //    repeat: -1,//infinite repeat
    //    frameRate: 6,
    //    frames: this.anims.generateFrameNames('player', { start: 0, end: 0 })
    //});
    //player.play('idle');

    var WinBox = this.matter.add.image(110, 550, 'WinBox', null, { isStatic: true });
    WinBox.setScale(.8, .8);
    WinBox.setSensor(true);

    var DestroyBallBox = this.matter.add.image(50, 1170, 'DestroyBallBox', null, { isStatic: true });
    DestroyBallBox.setScale(.2, .2);
    DestroyBallBox.setSensor(true);

    var hammer = this.matter.add.image(700, 960, 'hammer', null, { isStatic: true });
    hammer.setScale(.25, .25);
    hammer.setSensor(true);

    var ladder = this.matter.add.image(890, 1125, 'ladder', null, { isStatic: true });
    ladder.setScale(.25, .25);
    ladder.setSensor(true);


    var ladder2 = this.matter.add.image(110, 920, 'ladder', null, { isStatic: true });
    ladder2.setScale(.25, .25);
    ladder2.setSensor(true);
    //***
    var ladder3 = this.matter.add.image(465, 720, 'ladder', null, { isStatic: true });
    ladder3.setScale(.25, .55);
    ladder3.setSensor(true);
    //***
    var ground = this.matter.add.image(500, 1280, 'ground', null, { isStatic: true });
    ground.setScale(1, 1.5);
    ground.setAngle(-3);

    var ground2 = this.matter.add.image(220, 620, 'platform', null, { isStatic: true });
    ground2.setScale(1, .7);
    ground2.setAngle(7);
    ground2.setFriction(100000000000);

    var ground2B = this.matter.add.image(690, 680, 'platform', null, { isStatic: true });
    ground2B.setScale(.9, 0.7);
    ground2B.setAngle(7);

    var ground3 = this.matter.add.image(550, 850, 'platform', null, { isStatic: true });
    ground3.setScale(1.9, 1);
    ground3.setAngle(-7);
    //ground3.setFriction(100000000000);	

    var ground4 = this.matter.add.image(450, 1050, 'platform', null, { isStatic: true });
    ground4.setScale(1.9, .8);
    ground4.setAngle(7);
    //ground4.setFriction(100000000000);	

    var ground5 = this.matter.add.image(400, 300, 'platform', null, { isStatic: true });
    ground5.setScale(.7, 0.3);
    ground5.setFriction(0);

    var ground6 = this.matter.add.image(1000, 720, 'platform', null, { isStatic: true });
    ground6.setScale(.2, 3.5);
    ground6.setFriction(0);

    var ground7 = this.matter.add.image(10, 920, 'platform', null, { isStatic: true });
    ground7.setScale(.1, 3.7);
    ground7.setFriction(0);

    var ground8 = this.matter.add.image(1000, 1120, 'platform', null, { isStatic: true });
    ground8.setScale(.1, 3.5);
    ground8.setFriction(0);

    //there has to be a smarter way to do this:
    WinBox.setCollisionCategory(this.cat1);
    DestroyBallBox.setCollisionCategory(this.cat1);
    hammer.setCollisionCategory(this.cat1);
    ground.setCollisionCategory(this.cat1);
    ground2.setCollisionCategory(this.cat1);
    ground2B.setCollisionCategory(this.cat1);
    ground3.setCollisionCategory(this.cat1);
    ground4.setCollisionCategory(this.cat1);
    ground5.setCollisionCategory(this.cat1);
    ground6.setCollisionCategory(this.cat1);
    ground7.setCollisionCategory(this.cat1);
    ground8.setCollisionCategory(this.cat1);
    ladder.setCollisionCategory(this.cat1);
    ladder2.setCollisionCategory(this.cat1);
    ladder3.setCollisionCategory(this.cat1);


    ball = this.matter.add.image(50, 50, 'ball');
    console.log(ball);
    ball.setCircle();
    ball.setScale(.1);
    ball.setFriction(0);
    ball.setBounce(0.01);
    ball.setVelocity(0, 0);
    ball.setVelocityX(0);
    ball.setVelocityY(0);
    ball.setAngularVelocity(0.15);
    ball.setCollisionCategory(this.cat1);
    ball.label = "ball";

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        //console.log(bodyB.gameObject.texture.key);
        //console.log(bodyA.gameObject.texture.key);

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ground')) {
            playerTouchingGround = true;
        }
        if ((bodyA.gameObject.texture.key == 'ground') && (bodyB.gameObject.texture.key == 'player')) {
            playerTouchingGround = true;
        }
        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'platform')) {
            playerTouchingGround = true;
        }
        if ((bodyA.gameObject.texture.key == 'platform') && (bodyB.gameObject.texture.key == 'player')) {
            playerTouchingGround = true;
        }


        //ball touching ground
        if (bodyA.gameObject != null && bodyB.gameObject != null) {
            if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ground')) {
                bodyA.gameObject.label = 'ballGrounded';
                console.log("lable set to ballGrounded")
            }
            if ((bodyA.gameObject.texture.key == 'ground') && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.label = 'ballGrounded';
                console.log("lable set to ballGrounded")
            }
            if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'platform')) {
                bodyA.gameObject.label = 'ballGrounded';
                console.log("lable set to ballGrounded")
            }
            if ((bodyA.gameObject.texture.key == 'platform') && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.label = 'ballGrounded';
                console.log("lable set to ballGrounded")
            }
        }
        //end ball touching ground



        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'WinBox')) {
            alert("YOU WIN!!!");
            music.stop();
            location.reload();
        }

        if ((bodyA.gameObject.texture.key == 'DestroyBallBox') && (bodyB.gameObject.texture.key == 'ball')) {
            //console.log("Ball Destroyed, fire monster spawned");
            spawnAFireMonster = true;
            bodyB.gameObject.setActive(false).setVisible(false);
            bodyB.destroy();
        }

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
            playerTouchingLadder = true;
            console.log("overlap with ladder");
        }
        if ((bodyA.gameObject.texture.key == 'ladder') && (bodyB.gameObject.texture.key == 'ball')) {
            var r = Math.floor(Math.random() * 10);
            if (r > 4) {
                //ball.setVelocityY(0);
                bodyB.gameObject.setIgnoreGravity(true);

            }
            console.log("Ball hit ladder " + r);
        }
        if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ladder')) {
            var r = Math.floor(Math.random() * 10);
            if (r > 4) {
                //ball.setVelocityY(0);
                bodyA.gameObject.setIgnoreGravity(true);

            }
            console.log("Ball hit ladder " + r);
        }

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ball')) {
            if (playerHasHammer) {
                console.log('player rekt barrel')
                bodyB.gameObject.setActive(false).setVisible(false);
                bodyB.destroy();
            }
            else {
                music.stop();
                deathSound.play();
                alert("you lost!!!");
                location.reload();
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
        if (!playerHasHammer) {
            if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ground')) {
                playerTouchingGround = false;
            }
            if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'platform')) {
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
        if (bodyA.gameObject != null && bodyB.gameObject != null) {
            if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ground')) {
                bodyA.gameObject.label = 'ball';
                console.log("lable set back to ball")
            }
            if ((bodyA.gameObject.texture.key == 'ground') && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.label = 'ball';
                console.log("lable set back to ball")

            }
            if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'platform')) {
                bodyA.gameObject.label = 'ball';
                console.log("lable set back to ball")

            }
            if ((bodyA.gameObject.texture.key == 'platform') && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.label = 'ball';
                console.log("lable set back to ball")

            }
        }
        //end ball touching ground



        if ((bodyA.gameObject.texture.key == 'ladder') && (bodyB.gameObject.texture.key == 'ball')) {
            bodyB.gameObject.setIgnoreGravity(false);
            console.log("ball stopped hitting ladder");
        }
        if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ladder')) {
            bodyA.gameObject.setIgnoreGravity(false);
            console.log("ball stopped hitting ladder");
        }

        if ((bodyA.gameObject.texture.key == 'ball') && (bodyB.gameObject.texture.key == 'ground')) {
            bodyA.gameObject.setVelocityX(0);
            console.log("ball came off ground");
        }

        if (bodyB.gameObject != null) {
            if ((bodyA.gameObject.texture.key == 'ground') && (bodyB.gameObject.texture.key == 'ball')) {
                bodyB.gameObject.setVelocityX(0);
                console.log("ball came off ground B");
            }
        }
    });//comment

    //path
    graphics = this.add.graphics();
    path = new Phaser.Curves.Path(120, 1080);
    path.lineTo(950, 1150);
    path.lineTo(950, 1020);
    path.lineTo(50, 930);
    path.lineTo(50, 820);
    path.lineTo(900, 700);



    followers = this.add.group();
    //followers = this.matter.add.group();

    //for (var i = 0; i < 3; i++)
    //{
    //    var fireSprite = followers.create(0, -50, 'firesprite');
    //    fireSprite.setData('vector', new Phaser.Math.Vector2());

    //    this.tweens.add({
    //        targets: fireSprite,
    //        z: 1,
    //        ease: 'Sine.easeInOut',
    //        duration: 20000,
    //        yoyo: true,
    //        repeat: -1
    //    });

    //}

    //end path

}

var delay = 1000;
var lastClick = Date.now();
var rand = Math.floor(Math.random() * 1000);

var delayBall = 4000 + rand;//spawn frequency of ball
var lastBall = Date.now();

var hammerTime = Date.now();

let playerDiedBool = false;

function playerDied() {
    music.stop();
    deathSound.play();
    alert("you lost!!!");
    location.reload();
}

function update() {
	//player.setIgnoreGravity(true);
    //player.setVelocityY(.27);
    //player.setVelocityX(0);

    player.setAngle(0);

    if (player.x <= 17) {
        player.x = 17;
    }
    if (player.x >= 980) {
        player.x = 980;
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
        ball = this.matter.add.image(50, 50, 'ball');
        ball.setCircle();
        ball.setScale(.1);
        ball.setFriction(0);
        ball.setBounce(0.01);
        ball.setVelocity(0, 0);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
        ball.setAngularVelocity(0.15);
        ball.setCollisionCategory(this.cat1);
        ball.label = "ball";
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
        player.y -= 1;
        //player.setVelocityX(0);

        //player.flipX = true;
        //player.play('idle', true);
    }
    else if (this.keyS.isDown && playerTouchingLadder && !playerHasHammer) {
        //player.setVelocityY(2);
        player.y += 1;
        //player.setVelocityX(0);

        //player.flipX = true;
        //player.play('idle', true);
    }
    //else if (playerTouchingLadder) {
    //    player.setVelocityY(0);
    //    player.play('idle', true);
    //}
    else if (this.keyA.isDown) {
        console.log('A is pressed');
        player.setVelocityX(-2);
        player.flipX = true;
        //player.play('walk', true);
    }
    else if (this.keyD.isDown) {
        console.log('D is pressed');
        player.setVelocityX(2);
        player.flipX = false;
        //player.play('walk', true);
    }
    else {
        player.play('idle');
        player.setVelocityX(0)
    }

	var bodies = this.matter.world.localWorld.bodies;
	bodies.forEach(body => { 
		//if(body.gameObject.texture.key == 'ball'){
        if (body.gameObject.label == 'ballGrounded') {
			body.gameObject.setVelocityY(1) 
		}
	});

    if (spawnAFireMonster) {
        //this.graphics = this.add.graphics();
        //follower = { t: 0, vec: new Phaser.Math.Vector2() };
        //this.matter.add.image
        var fireSprite = followers.create(0, -50, 'firesprite');
        console.log(this.matter.world);
        //this.physics.matter.world.enable(fireSprite);
        //this.matter.add(fireSprite);
        //fireSprite.body.setCircle(1);

        //can't set these values like this, not sure how to set these values for a creategroup thing
        //fireSprite.gameObject.setCircle();
        //fireSprite.gameObject.setScale(.1);
        //fireSprite.gameObject.setFriction(0);
        //fireSprite.gameObject.setBounce(0.01);
        //fireSprite.gameObject.setVelocity(0, 0);
        //fireSprite.gameObject.setVelocityX(0);
        //fireSprite.gameObject.setVelocityY(0);
        //fireSprite.gameObject.setAngularVelocity(0.15);
        //fireSprite.gameObject.setCollisionCategory(this.cat1);
        //fireSprite.gameObject.label = "firesprite";


        fireSprite.setData('vector', new Phaser.Math.Vector2());
        //this works as in does not throw an error but not sure if it's the real label or just creates an ad hoc label key for the data manager:
        fireSprite.setData('label', 'firesprite');


        console.log("spawn fire monster");
        this.tweens.add({
            targets: fireSprite,
            z: 1,
            ease: 'Sine.easeInOut',
            duration: 20000,
            yoyo: true,
            repeat: -1
        });
        spawnAFireMonster = false;
    }
    //path:
    graphics.clear();
    graphics.lineStyle(2, 0xffffff, 1);
    //path.draw(graphics);

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

        //if (rect1.x < rect2.x + rect2.width &&
        //	rect1.x + rect1.width > rect2.x &&
        //	rect1.y < rect2.y + rect2.height &&
        //	rect1.y + rect1.height > rect2.y) {
        //	// collision detected!
        //}

    }
    //new


    // path.getPoint(follower.t, follower.vec);
    // this.graphics.fillStyle(0xff0000, 1);
    // this.graphics.fillCircle(follower.vec.x, follower.vec.y, 12);
    //end path
}