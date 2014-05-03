var MapBase = require('./MapBase');
var util = require('util');

function MapTest(PIXI, renderer) {
    MapTest.super_.call(this, PIXI, renderer);

    this.mapName = 'MapTest';

    this.textureRoot = './assets/img';
    this.textureMap = {
        0: { src: 'tile_dirt1.png' }
    };

    this.mapLayout = [
        [0, 0],
        [0, 0]
    ];
}
util.inherits(MapTest, MapBase);

MapTest.prototype.update = function() {
    this.updateView();
};

module.exports = MapTest;