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
            gravity: { x: 0, y: 1 },
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
    this.load.image("WinBox", 'src/assets/logo.png');
    this.load.image("DestroyBallBox", 'src/assets/DestroyBallBox.png');
    this.load.image("enemy", 'src/assets/donkeykong.jpg');
    this.load.image("ground", 'src/assets/donkeykongplatform.jpg');
    this.load.image("block", 'src/assets/tile43.png');
    this.load.image('ball', 'src/assets/ball.png');
    this.load.image('ladder', 'src/assets/ladder.png');
    this.load.image('firesprite', 'src/assets/smallfiresprite.png');



    this.load.spritesheet('player', 'src/assets/marioSmallspritesheet.png', {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 1
    });

}

function create() {
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.bg = this.add.sprite(0, 0, 'background');
    //this.bg.setDisplaySize(this.bg.width*2, this.bg.height*3);
    this.bg.setDisplaySize(1000, 1280);
    this.bg.setScale(3, 2);

    this.cat1 = this.matter.world.nextCategory();
    var cat2 = this.matter.world.nextCategory();

    player = this.matter.add.sprite(100, 1110, 'player', 0);
    player.label = "player1";
    player.setFriction(10);
    player.setCollidesWith([this.cat1]);
    //player.setOverlapsWith([cat2]);    

    //this.cameras.main.setSize(this.bg.width, 730);
    this.cameras.main.setSize(1000, 1280);
    this.cameras.main.setBounds(0, 0, this.bg.width, this.bg.height);
    //this.cameras.main.startFollow(this.player);

    this.anims.create({
        key: 'walk',
        repeat: -1,//infinite repeat
        frameRate: 6,
        frames: this.anims.generateFrameNames('player', { start: 4, end: 5 })
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

    var WinBox = this.matter.add.image(110, 550, 'WinBox', null, { isStatic: true });
    WinBox.setScale(.25, .25);
    WinBox.setSensor(true);

    var DestroyBallBox = this.matter.add.image(50, 1170, 'DestroyBallBox', null, { isStatic: true });
    DestroyBallBox.setScale(.2, .2);
    DestroyBallBox.setSensor(true);

    var ladder = this.matter.add.image(890, 1120, 'ladder', null, { isStatic: true });
    ladder.setScale(.25, .25);
    ladder.setSensor(true);

    var ladder2 = this.matter.add.image(110, 925, 'ladder', null, { isStatic: true });
    ladder2.setScale(.25, .25);
    ladder2.setSensor(true);
    //***
    var ladder3 = this.matter.add.image(465, 720, 'ladder', null, { isStatic: true });
    ladder3.setScale(.25, .55);
    ladder3.setSensor(true);
    //***
    var ground = this.matter.add.image(500, 1250, 'ground', null, { isStatic: true });
    ground.setScale(2.5, 0.7);
    ground.setAngle(-3);
    ground.setFriction(0);

    var ground2 = this.matter.add.image(220, 620, 'ground', null, { isStatic: true });
    ground2.setScale(.9, 0.3);
    ground2.setAngle(7);
    //ground2.setFriction(100000000000);

    var ground2B = this.matter.add.image(690, 680, 'ground', null, { isStatic: true });
    ground2B.setScale(.8, 0.3);
    ground2B.setAngle(7);

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

    var ground7 = this.matter.add.image(1000, 1100, 'ground', null, { isStatic: true });
    ground7.setScale(.1, 2);
    ground7.setFriction(0);

    //there has to be a smarter way to do this:
    WinBox.setCollisionCategory(this.cat1);
    DestroyBallBox.setCollisionCategory(this.cat1);
    ground.setCollisionCategory(this.cat1);
    ground2.setCollisionCategory(this.cat1);
    ground3.setCollisionCategory(this.cat1);
    ground4.setCollisionCategory(this.cat1);
    ground5.setCollisionCategory(this.cat1);
    ground6.setCollisionCategory(this.cat1);
    ground7.setCollisionCategory(this.cat1);
    ladder.setCollisionCategory(this.cat1);
    ladder2.setCollisionCategory(this.cat1);
    ladder3.setCollisionCategory(this.cat1);



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

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
        //console.log(bodyB.gameObject.texture.key);
        //console.log(bodyA.gameObject.texture.key);

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ground')) {
            playerTouchingGround = true;
        }

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ball')) {
            alert("you lost!!!");
            location.reload();
        }

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'WinBox')) {
            alert("YOU WIN!!!");
            
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

    });

    this.matter.world.on('collisionend', function (event, bodyA, bodyB) {
        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ground')) {
            playerTouchingGround = false;
        }

        if ((bodyA.gameObject.texture.key == 'player') && (bodyB.gameObject.texture.key == 'ladder')) {
            playerTouchingLadder = false;
            console.log("stopped overlap with ladder");
        }

        if ((bodyA.gameObject.texture.key == 'ladder') && (bodyB.gameObject.texture.key == 'ball')) {
            bodyB.gameObject.setIgnoreGravity(false);
            console.log("ball stopped hitting ladder");
        }
    });

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

    //this.matter.world.on("collisionactive", (player, ground) => {
    //    playerTouchingGround = true;
    //});

    //path
    graphics = this.add.graphics();
    path = new Phaser.Curves.Path(120, 1150);
    path.lineTo(900, 1150);
    path.lineTo(900, 1080);
    path.lineTo(100, 980);

    followers = this.add.group();

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

var delayBall = 4000;//spawn frequency of ball
var lastBall = Date.now();

function update() {

    player.setAngle(0);

    if (player.x <= 17) {
        player.x = 17;
    }
    if (player.x >= 980) {
        player.x = 980;
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

    if (this.keySpace.isDown && playerTouchingGround && (lastClick <= (Date.now() - delay))) {
        player.setVelocityY(-7);
        lastClick = Date.now();
    }
    if (this.keyW.isDown && playerTouchingLadder) {
        //console.log('W is pressed');
        //player.setVelocityY(-2);
        player.y -= 1;
        //player.setVelocityX(0);

        //player.flipX = true;
        player.play('idle', true);
    }
    else if (this.keyS.isDown && playerTouchingLadder) {
        //player.setVelocityY(2);
        player.y += 1;
        //player.setVelocityX(0);

        //player.flipX = true;
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



    if (spawnAFireMonster) {
        //this.graphics = this.add.graphics();
        //follower = { t: 0, vec: new Phaser.Math.Vector2() };

        var fireSprite = followers.create(0, -50, 'firesprite');
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
    }
    //new


   // path.getPoint(follower.t, follower.vec);
   // this.graphics.fillStyle(0xff0000, 1);
   // this.graphics.fillCircle(follower.vec.x, follower.vec.y, 12);
    //end path
}