import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mario from "./assets/mario.png";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 500,
  height: 888,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
    scene:{
        preload: preload,//these are all the scene names here
        create: create,
        update: update
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
    this.load.image("block", 'src/assets/singletilesprite.png'); 



    this.load.spritesheet('player', 'src/assets/mariospritesheet.jpg', {
        frameWidth: 180,
        frameHeight: 220,
        margin: 1,
        spacing: 1
    });



}

function create() {
   // const logo = this.add.image(400, 150, "logo");
   // const mario = this.add.image(100, 50, "mario");
    //const background = this.add.image(100, 50, "background");
    //let bg = this.add.sprite(0, 0, 'background');
    //bg.image.sc
   // bg.setOrigin(0, 0);

    //these two are same as just config.heigth/width i think
    //let gameWidth = this.sys.game.config.width;
    //let gameHeight = this.sys.game.config.height;
   


   // this.events.on('resize', this.parent.resize, this);
    this.bg = this.add.sprite(config.width / 2, config.height / 2, 'background');
    this.bg.setDisplaySize(config.width, config.height);

    //this.player = this.add.sprite(150, 116, 'player');
    //player.x = 200;//can move over
    //player.depth = 1;//sprite layer
    //this.player.setScale(0.25, 0.25);

    this.player = this.physics.add.sprite(150, 100, 'player');
    this.player.body.allowGravity = true;
    this.player.setScale(0.25);

    //add physics to existing sprite
    //this.ground = this.add.sprite(190, 160, 'ground');
    //this.ground.depth = 1;
    //this.ground.setScale(0.3);
    ////this.ground.setDisplaySize(30, 30);
    //this.physics.add.existing(this.ground);
    //this.ground.body.allowGravity = false;

    //physics and sprite in one line
    let ground2 = this.physics.add.sprite(190, 160, 'ground', false);//last boolean true means will be static body
    ground2.body.allowGravity = false;
    ground2.setScale(0.3);
    ground2.body.immovable = true;//so the ground does not move when player falls on it

    let platform = this.add.tileSprite(400, 400, 320, 320, 'block');
    platform.depth = 1;

    //this is how to do static body but I can't get it to work with scaling
    //let ground1 = this.add.sprite(490, 160, 'ground');
    //this.physics.add.existing(ground1, true);//last boolean true means will be static body, so no need to 
    ////set gravity false or immovable true, but also adding this way does not seem to scale the collider
    //ground1.setScale(0.3);

    this.physics.add.collider(ground2, this.player);
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
   


}

//function resize(width, height)
//{
//    this.cameras.resize(width, height);
//    this.bg.setDisplaySize(width, height);
//    // this.logo.setPosition(width / 2, height / 2);
//}