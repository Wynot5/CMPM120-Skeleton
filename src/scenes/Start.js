import { Bullet } from '../objects/bullet.js';
import { Enemy } from '../objects/enemy.js';

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('alien', 'assets/alienBlue.png');

        this.load.image('projectile', 'assets/laser.png');

        this.load.image('bat', 'assets/bat.png');
        this.load.image('bee', 'assets/bee.png');
    }

    create() {
        this.background = this.add.sprite(640, 320, 'background');
        
        this.player = this.add.sprite(640, 600, 'alien');
        this.enemy_group = this.add.group("enemies");

        this.player.speed = 300;
        this.player.bullet_speed = 400;
        this.player.last_attack = 0;
        this.player.attack_speed = 100;
        this.player.attack_angle = 270;

        this.last_time = 0;
        this.player_bullets = this.add.group("player_bullets");
        this.enemy_bullets = this.add.group("enemy_bullets");

        //this.up = this.input.keyboard.addKey("W", false, true);
        //this.down = this.input.keyboard.addKey("S", false, true);
        this.left = this.input.keyboard.addKey("A", false, true);
        this.right = this.input.keyboard.addKey("D", false, true);
        this.left2 = this.input.keyboard.addKey("LEFT", false, true);
        this.right2 = this.input.keyboard.addKey("RIGHT", false, true);
        this.space = this.input.keyboard.addKey("SPACE", false, true);
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

       /* if(this.up.isDown){
            this.player.y -= this.player.speed*dt;
        }
        if(this.down.isDown){
            this.player.y += this.player.speed*dt;
        }*/
        if(this.left.isDown || this.left2.isDown){
            this.player.x -= this.player.speed*dt;
        }
        if(this.right.isDown || this.right2.isDown){
            this.player.x += this.player.speed*dt;
        }

        if((this.player.last_attack + this.player.attack_speed < time) && (this.space.isDown) && (this.player_bullets.getLength() < 3)){
            this.player.last_attack = time;

            let bullet = new Bullet(this, this.player.x, this.player.y, this.player.attack_angle, this.player.bullet_speed);
            this.player_bullets.add(bullet);
        }

        if(this.enemy_group.children.entries.length == 0){
            const spawns = this.cache.json.get("spawns");
            console.log(spawns);
            let idx = 1;
            const spawn = spawns[idx];
            for(let i = 0; i < spawn.count*(Math.log(this.wave)+1); ++i){
                const dist = 1500 + i*500 + Math.random()*500;
                const angle = i * 360/spawn.count + Math.random()*60 - 30;
                const target = {x: this.game.canvas.width/2, y: this.game.canvas.height/2};
                const e = new Enemy(this, dist, 0, spawn.sprite, angle, spawn.speed, spawn.attack_rate, spawn.bullet_speed, spawn.damage, target, this.time.now);
                e.setScale(0.5);
                Phaser.Math.RotateAround(e, 0, 0, Phaser.Math.DegToRad(angle));
                this.enemy_group.add(e);
            }
        }
        
    }
    
}
