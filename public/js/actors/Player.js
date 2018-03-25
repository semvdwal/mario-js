import {Actor} from "./Actor.js";
import {Controls} from "../helpers/Controls.js";

export class Player extends Actor {

    constructor() {
        super();

        this.controlledEntity = null;

        this.pressedLeft = 0;
        this.pressedRight = 0;
        this.isRunning = false;

        Controls.instance().listenTo(["Left", "Right", "B"], (state, key) => {
            if (key == "Left") this.pressedLeft = state ? -1 : 0;
            if (key == "Right") this.pressedRight = state ? 1 : 0;
            if (key == "B") this.isRunning = state;

            if (this.controlledEntity != null) {
                this.controlledEntity.walk.direction = this.pressedLeft + this.pressedRight;
                this.controlledEntity.walk.isRunning = this.isRunning;
            }
        });
    }

    setEntity(entity) {
        this.controlledEntity = entity;
    }

    update(deltaTime) {
    }

}