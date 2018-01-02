import {Actor} from "./Actor.js";
import {Vector} from "../helpers/Vector.js";

export class Camera extends Actor {

    constructor() {
        super();
        this.position = new Vector(0, 0);
        this.followDistance = 100;

        this.followedEntity = null;
    }

    static instance() {
        if (Camera._instance == null) Camera._instance = new Camera();
        return Camera._instance;
    }

    update(deltaTime) {
        if (this.followedEntity != null) {
            if (this.followedEntity.position.x > this.followDistance) {
                this.position.x = this.followedEntity.position.x - this.followDistance;
            } else {
                this.position.x = 0;
            }
        }
    }

    setEntity(entity) {
        this.followedEntity = entity;
    }

    translate(x, y) {
        return [x - this.position.x,  y - this.position.y];
    }

}