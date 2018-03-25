import {Entity} from './Entity.js';
import {Camera} from "../actors/Camera.js";

export class Enemy extends Entity {

    constructor(name, x, y) {
        super(name);

        this.position.x = x;
        this.position.y = y;

        this.frozen = true;
        this.defeated = false;
        this.defeatedTime = 0;

        this.respawns = false;
        this.respawned = false;
    }

    update(deltaTime) {
        if(this.frozen && Camera.instance().visible(this)) {
            this.frozen = false;
        } else if(this.defeated && this.respawns && !this.respawned) {
            this.respawned = true;
            this.respawn();
        }

        if(!this.frozen) {
            super.update(deltaTime);
        }
    }

    respawn() {
        // To be implemented by extending classes
    }

}