import {Actor} from "./Actor.js";
import {Vector} from "../helpers/Vector.js";

export class Camera extends Actor {

    constructor() {
        super();

        this.position = new Vector(0, 0);
    }



}