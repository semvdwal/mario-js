export class SpriteSheet {

    constructor(name, img, tileSetDefinitions) {
        this.name = name;
        this.img = img;
        this.tileSets = tileSetDefinitions;
        this.activeTileSet = this.tileSets[0];
    }

    static load(name) {
        if (typeof SpriteSheet.spriteSheets == "undefined") SpriteSheet.spriteSheets = {};
        if (!SpriteSheet.spriteSheets.hasOwnProperty(name)) {
            SpriteSheet.spriteSheets[name] = new Promise(resolve => {
                Promise.all([
                    new Promise(resolveImage => {
                        let img = new Image();
                        img.addEventListener('load', () => {
                            resolveImage(img);
                        });
                        img.src = '../resources/images/' + name + '.png';
                    }),
                    fetch('/resources/spritesheets/' + name + '.json').then(response => response.json())
                ]).then(([img, tileSetDefinitions]) => {
                    resolve(new SpriteSheet(name, img, tileSetDefinitions));
                });
            });
        }
        return SpriteSheet.spriteSheets[name];
    }

    selectTileset(name) {
        if (this.tileSets != null) {
            this.tileSets.forEach(tileSet => {
                if (tileSet.name == name) {
                    this.activeTileSet = tileSet;
                    return;
                }
            });
            this.activeTileSet = this.tileSets[0];
        }
    }

    get(name) {
        let tileImg = false;
        this.activeTileSet.tiles.forEach(tile => {
            if (tile.name == name) {
                if (tile.canvas == undefined) {
                    let canvas = document.createElement('canvas');
                    canvas.width = tile.size.w;
                    canvas.height = tile.size.h;
                    canvas.getContext("2d").drawImage(this.img, tile.position.x, tile.position.y, tile.size.w, tile.size.h, 0, 0, tile.size.w, tile.size.h);
                    tile.canvas = canvas;
                }
                tileImg = tile.canvas;
            }
        });
        return tileImg;
    }

    anim(name, deltaTime) {
        let frameName = name;
        this.activeTileSet.animations.forEach(animation => {
            if (animation.name == name) {
                let frameNumber = Math.floor( (deltaTime / animation.speed) % animation.frames.length);
                frameName = animation.frames[frameNumber];
            }
        });
        return this.get(frameName);
    }

}