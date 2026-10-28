export class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver');
    }

    preload(){
        this.load.image('background', 'assets/bg.png');
    }

    create(){
        this.background = this.add.sprite(640, 320, 'background');
        this.add.text(300, 300, 'YOU DIED!', { fontSize: '128px', fill: '#FFF', align: "center" });
        this.add.text(100, 440, 'Press Space to restart', { fontSize: '78px', fill: '#FFF', align: "center" });
        this.space = this.input.keyboard.addKey("SPACE", false, true);
    }

    update(){
        if(this.space.isDown){
            this.scene.stop("GameOver");
            this.scene.start("Start");
        }
    }
}