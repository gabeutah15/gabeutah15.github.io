import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mario from "./assets/mario.png";

var config = {
    type: Phaser.AUTO,
	autoCenter: true,
    width: 720,
    height: 730,
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
var game = new Phaser.Game(config);

function preload ()
{	 
    this.load.image("background", 'src/assets/waterbg.jpg'); 
    this.load.image("enemy", 'src/assets/donkeykong.jpg'); 
    this.load.image("ground", 'src/assets/donkeykongplatform.jpg'); 
    this.load.image("block", 'src/assets/tile43.png'); 

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
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
	this.bg = this.add.sprite(0,0 , 'background');
    this.bg.setDisplaySize(this.bg.width*2, this.bg.height*3);
	
	this.player = this.matter.add.sprite(150, 100, 'player', 0);
		this.player.setFriction(10);

	this.cameras.main.setSize(this.bg.width, 730);
	this.cameras.main.setBounds(0, 0, this.bg.width, this.bg.height);
	this.cameras.main.startFollow(this.player);
	
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
	this.player.play('idle');

	var ground = this.matter.add.image(360, 1200, 'ground', null, { isStatic: true });
	    ground.setScale(2, 0.7);
		ground.setFriction(0);

    var ground2 = this.matter.add.image(100, 1000, 'ground', null, { isStatic: true });
	    ground2.setScale(.5, 0.3);
		ground2.setAngle(5);
		ground2.setFriction(100000000000);		
		
	var ground3 = this.matter.add.image(500, 900, 'ground', null, { isStatic: true });
	    ground3.setScale(.7, 0.3);
		ground3.setFriction(0);
}	

var delay = 1000;
var lastClick = Date.now();

function update() {
	
	this.player.setAngle(0);
	
	if (this.keySpace.isDown && (lastClick <= (Date.now() - delay))) {
        //console.log('s is pressed');
        this.player.setVelocityY(-7);
        lastClick = Date.now();
    }
   
    if (this.keyA.isDown) {
        console.log('A is pressed');
        this.player.setVelocityX(-2);
        this.player.flipX = true;
        this.player.play('walk', true);

       
    }
    else if (this.keyD.isDown) {
        console.log('D is pressed');
        this.player.setVelocityX(2);
        this.player.flipX = false;
        this.player.play('walk', true);
    }
    else {
        this.player.play('idle');
		this.player.setVelocityX(0)
	}
}