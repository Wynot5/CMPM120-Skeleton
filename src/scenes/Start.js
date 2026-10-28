import { Bullet } from '../objects/bullet.js';
import { Enemy } from '../objects/enemy.js';

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('alien', 'assets/alienBlue.png');

        this.load.image('laser', 'assets/laser.png');
        this.load.image('bolt', 'assets/bolt.png');

        this.load.image('bat', 'assets/bat.png');
        this.load.image('bee', 'assets/bee.png');
    }

    create() {
        this.background = this.add.sprite(640, 320, 'background');
        
        this.player = this.add.sprite(640, 600, 'alien');
        this.physics.add.existing(this.player);
        this.enemy_group = this.add.group("enemies");

        this.player.hp = 100;
        this.player.score = 0;
        this.player.speed = 300;
        this.player.bullet_speed = 400;
        this.player.last_attack = 0;
        this.player.attack_speed = 100;
        this.player.attack_angle = 270;
        this.score_label = this.add.text(0, 0, 'HP: ' + this.player.hp, { fontSize: '32px', fill: '#FFF' });

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

    getPath(){
        let path1 = this.add.path(0, 0);
        path1.lineTo(1280, 0);

        let path2 = this.add.path(1280,0);
        path2.lineTo(0,0);

        let paths = [path1, path2];
        return paths;
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

            let bullet = new Bullet(this, this.player.x, this.player.y, this.player.attack_angle, this.player.bullet_speed, 100, 'laser');
            this.player_bullets.add(bullet);
        }

        if(this.enemy_group.children.entries.length == 0){
            //const spawns = this.cache.json.get("spawns");
            const spawns = {
                "sprite": "bee",
                "name": "The Space Bee",
                "description": "Back from the dead",
                "count": 5,
                "speed": 100,
                "attack_rate": 1500,
                "bullet_speed": 800,
                "damage": 3,
            }
            //let idx = 0;
            const spawn = spawns;
            for(let i = 0; i < spawn.count; ++i){
                const dist = 1500 + i*500 + Math.random()*500;
                const angle = i * 360/spawn.count + Math.random()*60 - 30;
                let paths = this.getPath();
                const e = new Enemy(this, paths[i%2], 1280*(i%2), 30 + i*75, spawn.sprite, angle, spawn.speed, spawn.attack_rate, spawn.bullet_speed, spawn.damage, this.time.now);
                //Phaser.Math.RotateAround(e, 0, 0, Phaser.Math.DegToRad(angle));
                this.enemy_group.add(e);
                this.physics.add.existing(e);
            }
        }
        this.score_label.text = "HP: " + this.player.hp + " Score: " +this.player.score;
        this.physics.world.overlap(this.player_bullets, this.enemy_group, (b,e) => {e.destroy(true); b.destroy(true); this.player.score += 100;});
        this.physics.world.overlap(this.player, this.enemy_bullets, (p,b) => { p.hp -= b.damage; b.destroy(true); this.checkEndGame();});
        this.physics.world.overlap(this.player_bullets, this.enemy_bullets, (p,e) => {p.destroy(true);});
    }

    checkEndGame(){
        if(this.player.hp <= 0){
            this.scene.stop("Start");
            this.scene.start("GameOver");
        }
    }
    
}
