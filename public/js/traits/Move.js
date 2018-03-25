import {Trait} from "./Trait.js";
import {Sides} from "../entities/Entity.js";
import {Collider} from "../layers/Collider.js";

export class Move extends Trait {

    constructor() {
        super("Move");

        this.baseHorizontalDragFactor = 1/4000;
        this.currentHorizontalDragFactor = this.baseHorizontalDragFactor;

        this.baseVerticalDragFactor = 1/6000;

        this.slowestSpeed = 8;
        Move.maxSpeed = 200;
    }

    update(entity, deltaTime) {

        if(entity.velocity.x > Move.maxSpeed) entity.velocity.x = Move.maxSpeed;
        if(entity.velocity.y > Move.maxSpeed) entity.velocity.y = Move.maxSpeed;

        entity.position.x += entity.velocity.x * (deltaTime / 1000);
        Collider.instance().checkX(entity);

        entity.position.y += entity.velocity.y * (deltaTime / 1000);
        Collider.instance().checkY(entity);

        entity.velocity.y -= this.baseVerticalDragFactor * entity.velocity.y * Math.abs(entity.velocity.y);

        if(Math.abs(entity.velocity.x) > this.slowestSpeed) {
            entity.velocity.x -= this.currentHorizontalDragFactor * entity.velocity.x * Math.abs(entity.velocity.x);
        } else {
            entity.velocity.x = 0;
        }

        this.currentHorizontalDragFactor = this.baseHorizontalDragFactor;
    }

    obstruct(entity, collider, side) {
    }

    collidesWith(entity, collider, side) {
        switch (side) {
            case Sides.TOP:
                if (entity.velocity.y < 0) entity.velocity.y = 0;
                break;
            case Sides.BOTTOM:
                if (entity.velocity.y > 0) entity.velocity.y = 0;
                break;
            case Sides.RIGHT:
                if (entity.velocity.x > 0) entity.velocity.x = 0;
                break;
            case Sides.LEFT:
                if (entity.velocity.x < 0) entity.velocity.x = 0;
        }
    }

}