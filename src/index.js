import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mario from "./assets/mario.png";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:200}
        }
    },
    scene:{
    preload: preload,
    create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image("logo", logoImg);
    this.load.image("mario", mario);

}

function create() {
    const logo = this.add.image(400, 150, "logo");
    const mario = this.add.image(400, 150, "mario");


  //this.tweens.add({
  //  targets: logo,
  //  y: 450,
  //  duration: 2000,
  //  ease: "Power2",
  //  yoyo: true,
  //  loop: -1
  //});
}
