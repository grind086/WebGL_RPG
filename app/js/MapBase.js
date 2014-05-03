var util = require('util');

function MapBase(PIXI, renderer) {
    this.PIXI = PIXI;
    this.renderer = renderer;

    this.textureRoot = '.';
    this.textureMap = {};
    this.mapLayout = [];

    this.tileSize = 16;

    //this.mapContainer = new PIXI.SpriteBatch();
    this.mapContainer = new PIXI.DisplayObjectContainer();
    this.mapTexture = null;

    this.mapName = 'Default';

    this.camera = null;
    this.view = null;

    var log = function(msg) { console.log(msg) };
    this.onLoadStart(log);
    this.onLoadUpdate(log);
    this.onload(log);
}

MapBase.prototype.updateView = function() {
    if (this.camera) {
        this.camera.update();
    }

    var viewRect = this.camera ? this.camera.getRect() : new this.PIXI.Rectangle(0, 0, 640, 480);
    this.view = new this.PIXI.Texture(this.mapTexture);
};

MapBase.prototype.init = function() {
    this.load();
    this.initDimensions();
    this.initTexture();
    this.updateView();
};

MapBase.prototype.initDimensions = function() {
    this.height = this.mapLayout.length;
    this.width = 0;
    for (var i = 0; i < this.mapLayout.length; i++) {
        this.width = Math.max(this.mapLayout[i].length, this.width);
    }
};

MapBase.prototype.initTexture = function() {
    var texture;
    var textureSprite;
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            if (this.mapLayout[y][x]) {
                texture = this.textureMap[this.mapLayout[y][x]].texture;
            } else {
                texture = this.textureMap[0].texture;
            }
            textureSprite = new this.PIXI.Sprite(texture);

            textureSprite.anchor.x = 0;
            textureSprite.anchor.y = 0;

            this.mapContainer.addChild(textureSprite);

            textureSprite.position.x = this.tileSize * x;
            textureSprite.position.y = this.tileSize * y;
            console.log(textureSprite);
        }
    }

    var text = new this.PIXI.Text("OH please render me!");

    this.mapTexture = new this.PIXI.RenderTexture(this.width * this.tileSize, this.height * this.tileSize, this.renderer);
    this.mapTexture.render(textureSprite); //(this.mapContainer);
};

MapBase.prototype.onLoadStart = function(cb) {
    this.loadStartCB = cb;
};

MapBase.prototype.onLoadUpdate = function(cb) {
    this.loadUpdateCB = cb;
};

MapBase.prototype.onload = function(cb) {
    this.loadFinishedCB = cb;
};

MapBase.prototype.load = function() {
    // One step for each texture
    var nSteps = Object.keys(this.textureMap).length;
    var loadmsg;

    console.log(this.textureMap);

    loadmsg = util.format('Loading map %s', this.mapName);
    this.loadStartCB(loadmsg, nSteps);

    var src, tName, tData;
    for (tName in this.textureMap) {
        if (!this.textureMap.hasOwnProperty(tName)) {
            console.log('Skip Loading ' + tName);
            continue;
        }
        console.log('Loading ' + tName);
        tData = this.textureMap[tName];

        loadmsg = util.format('Loading %s', tData.src);
        this.loadUpdateCB(loadmsg);

        // Note - texture caching is handled by PIXI, so we don't have to
        // worry about it.
        src = [this.textureRoot, tData.src].join('/');
        this.textureMap[tName].texture = this.PIXI.Texture.fromImage(src);
    }

    this.loadFinishedCB('Done Loading');
};

function Camera(w, h, mapw, maph) {
    this.xmin = 0;
    this.xmax = mapw - w;
    this.ymin = 0;
    this.ymax = maph - h;

    this.w = w;
    this.h = h;

    this.posX = w / 2;
    this.posY = h / 2;

    this.followEntity = null;
}

Camera.prototype.getRectAt = function(x, y) {
    // Given center coordinates, returns coordinates of top-left corner and
    // width and height.
    return new this.PIXI.Rectangle(
        helper.bound(x - this.w / 2, this.xmin, this.xmax),
        helper.bound(y - this.h / 2, this.ymin, this.ymax),
        this.w,
        this.h
    );
};

Camera.prototype.getRect = function() {
    return this.getRectAt(this.posX, this.posY);
};

Camera.prototype.update = function() {
    if (this.followEntity) {
        this.posX = this.followEntity.x;
        this.posY = this.followEntity.y;
    }
};

module.exports = MapBase;