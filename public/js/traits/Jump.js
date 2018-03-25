import {Trait} from "./Trait.js";
import {Controls} from "../helpers/Controls.js";
import {Sound} from "../helpers/Sound.js";
import {Sides} from "../entities/Entity.js";
import {Gravity} from "./Gravity.js";
import {Enemy} from "../entities/Enemy.js";

export class Jump extends Trait {

    constructor() {
        super("Jump");

        this.isJumping = false;
        this.jumpSpeed = 370;
        this.jumpTime = 0;
        this.maxJumpTime = 200;

        this.gravityFallingFactor = 1.8;
        this.gravityDefyingFactor = 1.1;

        this.canJump = true;

        this.sound = Sound.instance();

        Controls.instance().listenTo("A", (state) => {
            if (state && this.canJump) {
                this.startJump();
            } else {
                this.isJumping = false;
            }
        });
    }

    update(entity, deltaTime) {
        if (this.isJumping) {
            this.jumpTime += deltaTime;
            if (this.jumpTime >= this.maxJumpTime) {
                this.stopJump();
            }
        }

        if (deltaTime > 0) {
            if (entity.velocity.y > 0 && entity.velocity.y < Gravity.getTerminalVelocity()) {
                entity.velocity.y += Gravity.getGravityAmount() * (this.gravityFallingFactor - 1) * deltaTime;
            } else if (this.isJumping && entity.velocity.y < 0 && Controls.instance().isPressed("A")) {
                entity.velocity.y -= Gravity.getGravityAmount() * (this.gravityDefyingFactor - 1) * deltaTime;
            }
        }

        if (deltaTime > 0 && this.isJumping) {
            entity.velocity.y -= (this.jumpSpeed / deltaTime);
        }
    }

    startJump() {
        this.isJumping = true;
        this.canJump = false;
        this.sound.effect("jump-small");
    }

    stopJump() {
        this.isJumping = false;
        this.canJump = false;
    }

    resetJump() {
        this.canJump = true;
        this.jumpTime = 0;
    }

    enemyJump() {
        this.resetJump();
        this.startJump();
    }

    obstruct(entity, collider, side) {
        if(side === Sides.BOTTOM && entity.velocity.y > 0) {
            this.resetJump();
        }
    }

    collidesWith(entity, collider, side) {
        if (side === Sides.TOP) {
            this.stopJump();
        }
        if (side === Sides.BOTTOM) {
            if(collider instanceof Enemy && collider.hasOwnProperty('jumpkillable')) {
                this.enemyJump();
            } else {
                this.resetJump();
            }
        }
    }
    //
    // collidesWith(entity, collider) {
    //     if (entity.velocity.y >= 0) { // Bottom
    //         this.resetJump();
    //     } else if (entity.velocity.y < 0 && entity.bounds.bottom > collider.bounds.bottom) { // Top
    //         this.stopJump();
    //         entity.velocity.y = 0;
    //         entity.bounds.top = collider.bounds.bottom;
    //     }
    // }

}