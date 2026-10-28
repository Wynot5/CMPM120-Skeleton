export class GameOver extends Phaser.Scene{
    constructor(){
        super('GameOver');
    }

    preload(){
        this.load.image('background', 'assets/bg.png');
    }

    create(){
        this.background = this.add.sprite(640, 320, 'background');
        this.add.text(100, 300, 'U R DEAD', { fontSize: '128px', fill: '#FFF', align: "center" });
        this.add.text(400, 440, 'NOT BIG SUPRISE', { fontSize: '78px', fill: '#FFF', align: "center" });
    }
}