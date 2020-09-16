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
            gravity: {y:200}
        }
    },
    scene:{
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
   // this.load.image("logo", logoImg);
  //  this.load.image("mario", mario); 
    this.load.image("background", 'src/assets/donkeykongbackgrounddemo.png'); 
    this.load.image("player", 'src/assets/mariosmall.gif');
    this.load.image("enemy", 'src/assets/donkeykong.jpg'); 




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

    this.player = this.add.sprite(150, 116, 'player');
    //player.x = 200;//can move over
    //player.depth = 1;//sprite layer
    this.player.setScale(0.25,0.25);

    //lets you view bg in conosole with properties:
    //console.log(this.bg);

    this.enemy = this.add.sprite(350, 100, 'enemy');
    this.enemy.setScale(.1, .1);
    this.enemy2 = this.add.sprite(100, 240, 'enemy');
    this.enemy2.setScale(.05, .05);
    this.enemy2.flipX = true;
    //both of these work:
    //enemy2.angle = 45;
    this.enemy2.setAngle(45);
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
    this.enemy.x += 0.4;
    this.enemy2.angle += 1;

    if (this.player.scaleX < 0.5) {
        this.player.scaleX += 0.005;
        this.player.scaleY += 0.005;

    }
   


}

//function resize(width, height)
//{
//    this.cameras.resize(width, height);
//    this.bg.setDisplaySize(width, height);
//    // this.logo.setPosition(width / 2, height / 2);
//}