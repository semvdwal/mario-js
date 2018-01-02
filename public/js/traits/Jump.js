import {Trait} from "./Trait.js";
import {Controls} from "../helpers/Controls.js";
import {Sound} from "../helpers/Sound.js";
import {Sides} from "../entities/Entity.js";
import {Collider} from "../layers/Collider.js";

export class Jump extends Trait {

    constructor() {
        super("Jump");

        this.isJumping = false;
        this.jumpSpeed = 400;
        this.jumpTime = 0;
        this.maxJumpTime = 250;

        this.canJump = true;

        this.sound = Sound.instance();

        Controls.instance().listenTo("A", (state) => {
            if (state && this.canJump) {
                this.isJumping = true;
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

            Collider.instance().checkY(entity);
        }

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

    obstruct(entity, collider, side) {
        if (side === Sides.BOTTOM) {
            this.resetJump();
        } else if (side === Sides.TOP) {
            this.stopJump();
            entity.velocity.y = 0;
            entity.bounds.top = collider.bounds.bottom;
        }
    }

}