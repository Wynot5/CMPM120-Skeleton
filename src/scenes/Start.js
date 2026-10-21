export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('alien', 'assets/alienBlue.png');

    }

    create() {
        this.background = this.add.sprite(640, 320, 'background');
        this.player = this.add.sprite(640, 320, 'alien');

        this.player.speed = 300;

        this.last_time = 0;

        this.up = this.input.keyboard.addKey("W", false, true);
        this.down = this.input.keyboard.addKey("S", false, true);
        this.left = this.input.keyboard.addKey("A", false, true);
        this.right = this.input.keyboard.addKey("D", false, true);
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        if(this.up.isDown){
            this.player.y -= this.player.speed*dt;
        }
        if(this.left.isDown){
            this.player.x -= this.player.speed*dt;
        }
        if(this.down.isDown){
            this.player.y += this.player.speed*dt;
        }
        if(this.right.isDown){
            this.player.x += this.player.speed*dt;
        }
        
    }
    
}
