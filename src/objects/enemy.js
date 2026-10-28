import {Bullet} from "./bullet.js";

export class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, type, direction, speed, attack_rate, bullet_speed, damage, time){
        super(scene, path, x, y, type);
        scene.add.existing(this);
        this.direction = Phaser.Math.DegToRad(direction);
        this.scene = scene;
        this.speed = speed;
        this.rotation = this.direction;
        this.attack_rate = attack_rate;
        this.bullet_speed = bullet_speed;
        this.damage = damage;
        this.last_attack = time + Math.random()*this.attack_rate;
        this.startFollow({
            duration: 5000,
            repeat: -1,
            yoyo: true,
            rotationOffset: 90,
           // offset: {y: -360}
        });
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if (this.last_attack + this.attack_rate < time){
            this.last_attack = time;
            let b = new Bullet(this.scene, this.x, this.y, 90, this.bullet_speed, this.damage, 'bolt');
            b.setScale(2);
            this.scene.enemy_bullets.add(b);
        }
    }
}