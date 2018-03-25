import {Actor} from "./Actor.js";
import {Vector} from "../helpers/Vector.js";

export class Camera extends Actor {

    constructor() {
        super();
        this.position = new Vector(0, 0);
        this.followDistance = 100;

        this.followedEntity = null;

        this.width = 0;
        this.height = 0;
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
        } else {
            console.log("Followed Entity is null");
        }
    }

    setEntity(entity) {
        this.followedEntity = entity;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    translate(x, y) {
        return [x - this.position.x,  y - this.position.y];
    }

    visible(entity) {
        let [x, y] = this.translate(entity.position.x, entity.position.y);
        return x > 0 && x < this.width
            && y > 0 && y < this.height;
    }

}