export class Controls {

    constructor() {
        this.availableKeys = {
            "KeyA": "Left",
            "KeyW": "Up",
            "KeyD": "Right",
            "KeyS": "Down",
            "KeyK": "B",
            "KeyL": "A",
            "Escape": "Start"
        };

        this.keyStates = {
            "Left": false,
            "Up": false,
            "Right": false,
            "Down": false,
            "B": false,
            "A": false,
            "Start": false
        };

        this.keyMapping = {};
        document.addEventListener('keydown', (event) => {
            this.handleKeyEvent(event);
        });
        document.addEventListener('keyup', (event) => {
            this.handleKeyEvent(event);
        });
    }

    static instance() {
        if (!Controls._instance) Controls._instance = new Controls();
        return Controls._instance;
    }

    listenTo(keyList, callback) {
        if(typeof callback == "function") {
            if (typeof keyList == "string") {
                keyList = [keyList];
            }

            keyList.forEach(key => {
                let callbacks = this.getCallbacks(key);
                callbacks.push(callback);
                this.setCallbacks(key, callbacks);
            });
        }
    }

    getCallbacks(key) {
        if (!this.keyMapping.hasOwnProperty(key)) this.keyMapping[key] = [];
        return this.keyMapping[key];
    }

    setCallbacks(key, callbacks) {
        this.keyMapping[key] = callbacks;
    }

    handleKeyEvent(event) {
        if (this.availableKeys.hasOwnProperty(event.code)) {
            let key = this.availableKeys[event.code];
            let state = event.type === "keydown";

            if (!state || !this.keyStates[key]) {
                this.keyStates[key] = state;
                this.getCallbacks(key).forEach(callback => callback(state, key));
            }
        }
    }

    isPressed(key) {
        if (this.keyStates.hasOwnProperty(key)) {
            return this.keyStates[key];
        }
        return false;
    }

}