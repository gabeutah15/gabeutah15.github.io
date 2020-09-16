import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mario from "./assets/mario.png";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 720,
  height: 1280,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
    scene:{
        preload: preload,//these are all the scene names here? or function names?
        create: create,
        update: update,
        input: input
    }
};

const game = new Phaser.Game(config);

function preload() {
   // this.load.image("logo", logoImg);
  //  this.load.image("mario", mario); 
    this.load.image("background", 'src/assets/donkeykongbackgrounddemo.png'); 
    //this.load.image("player", 'src/assets/mariosmall.gif');
    this.load.image("enemy", 'src/assets/donkeykong.jpg'); 
    this.load.image("ground", 'src/assets/donkeykongplatform.jpg'); 
    this.load.image("block", 'src/assets/tile43.png'); 



    //this.load.spritesheet('player', 'src/assets/mariospritesheet.jpg', {
    //    frameWidth: 180,
    //    frameHeight: 220,
    //    margin: 1,
    //    spacing: 1
    //});

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


    this.bg = this.add.sprite(config.width / 2, config.height / 2, 'background');
    this.bg.setDisplaySize(config.width, config.height);

    //this.player = this.add.sprite(150, 116, 'player');
    //player.x = 200;//can move over
    //player.depth = 1;//sprite layer
    //this.player.setScale(0.25, 0.25);

    this.platforms = this.add.group();

    let ground2 = this.physics.add.sprite(190, 160, 'ground', false);//last boolean true means will be static body
    ground2.body.allowGravity = false;
    ground2.setScale(0.3);
    ground2.body.immovable = true;//so the ground does not move when player falls on it
    this.platforms.add(ground2);

    //tiles platform of specified length
    let platform = this.add.tileSprite(300, 100, 3 * 43, 43, 'block');
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);


    //this is how to do static body but I can't get it to work with scaling
    //let ground1 = this.add.sprite(490, 160, 'ground');
    //this.physics.add.existing(ground1, true);//last boolean true means will be static body, so no need to 
    ////set gravity false or immovable true, but also adding this way does not seem to scale the collider
    //ground1.setScale(0.3);

    this.player = this.physics.add.sprite(150, 100, 'player', 0);
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
    this.player.play('walk');
    //this.player.flipX = true;//works, so do that on input
    this.player.body.allowGravity = true;
    //this.player.setScale(0.25);

    this.physics.add.collider(this.platforms, this.player);
    //this.physics.add.collider(platform, this.player);
    //this.physics.add.collider(ground1, this.player);



    //lets you view bg in conosole with properties:
    //console.log(this.bg);

    //this.enemy = this.add.sprite(350, 100, 'enemy');
    //this.enemy.setScale(.1, .1);
    //this.enemy2 = this.add.sprite(100, 240, 'enemy');
    //this.enemy2.setScale(.05, .05);
    //this.enemy2.flipX = true;
    //both of these work:
    //enemy2.angle = 45;
    //this.enemy2.setAngle(45);
    //enemy.roation = math.pi/4 or enemy.setRotation(Math.PI/4); also works, if you do enemy.setOrigin first you can
    //rotate from somewhere other than the middle

  //this.tweens.add({
  //  targets: logo,
  //  y: 450,
  //  duration: 2000,
  //  ease: "Power2",
  //  yoyo: true,
  //  loop: -1
  //});


}


function update() {
    //this.enemy.x += 0.4;
    //this.enemy2.angle += 1;

    //if (this.player.scaleX < 0.5) {
    //    this.player.scaleX += 0.005;
    //    this.player.scaleY += 0.005;

    //}
    if (this.keyA.isDown) {
        console.log('A is pressed');
        this.player.x -= 1;
        this.player.flipX = true;
    }
    if (this.keyD.isDown) {
        console.log('D is pressed');
        this.player.x += 1;
        this.player.flipX = false;


    }


}

//this.input.keyboard.on('keydown_A', function (event) {
//    console.log('Hello from the A Key!');
//});

function input() {
    //this.right = this.scene.input.keyboard.addKey('D'); 
    //this.left = this.scene.input.keyboard.addKey('A'); 

    //var isDown = keyObj.isDown;
    //var isUp = keyObj.isUp;

    //this.keys = scene.input.keyboard.addKeys({
    //    up: 'up',
    //    down: 'down',
    //    left: 'left',
    //    right: 'right'
    //}); 
}