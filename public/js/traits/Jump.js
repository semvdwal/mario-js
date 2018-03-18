import {Trait} from "./Trait.js";
import {Controls} from "../helpers/Controls.js";
import {Sound} from "../helpers/Sound.js";
import {Sides} from "../entities/Entity.js";
import {Collider} from "../layers/Collider.js";
import {Gravity} from "./Gravity.js";

export class Jump extends Trait {

    constructor() {
        super("Jump");

        this.isJumping = false;
        this.jumpSpeed = 260;
        this.jumpTime = 0;
        this.maxJumpTime = 200;

        this.gravityFallingFactor = 2.3;
        this.gravityDefyingFactor = 1.1;

        this.canJump = true;

        this.sound = Sound.instance();

        Controls.instance().listenTo("A", (state) => {
            if (state && this.canJump) {
                this.isJumping = true;
                this.canJump = false;
                this.sound.effect("jump-small");
            } else {
                this.isJumping = false;
                this.canJump = false;
            }
        });
    }

    update(entity, deltaTime) {
        if (this.isJumping) {
            this.jumpTime += deltaTime;
            if (this.jumpTime >= this.maxJumpTime) {
                this.stopJump();
            }

            // Collider.instance().checkY(entity);
        }

        if (deltaTime > 0) {
            if (entity.velocity.y > 0 && entity.velocity.y < Gravity.getTerminalVelocity()) {
                entity.velocity.y += Gravity.getGravityAmount() * (this.gravityFallingFactor - 1) * deltaTime;
            } else if (this.isJumping && entity.velocity.y < 0 && Controls.instance().isPressed("A")) {
                entity.velocity.y -= Gravity.getGravityAmount() * (this.gravityDefyingFactor - 1) * deltaTime;
            }
        }

        // if (Collider.instance().checkObstruction(entity, Sides.TOP)) this.stopJump();
        if (Collider.instance().checkObstruction(entity, Sides.BOTTOM)) this.resetJump();

        if (deltaTime > 0 && this.isJumping) {
            entity.velocity.y -= (this.jumpSpeed / deltaTime);
        }
    }

    stopJump() {
        this.isJumping = false;
        this.canJump = false;
    }

    resetJump() {
        this.canJump = true;
        this.jumpTime = 0;
    }

    collidesWith(entity, collider, side) {
        if (side === Sides.TOP) {
            this.stopJump();
        }
        if (side === Sides.BOTTOM) {
            this.resetJump();
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