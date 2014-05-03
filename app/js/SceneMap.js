var SceneBase = require('./SceneBase');
var MapTest = require('./MapTest');
var util = require('util');

function SceneMap(PIXI, renderer) {
    SceneMap.super_.call(this, PIXI, renderer, 0xABCDEF);

    this.map = new MapTest(PIXI, renderer);
    this.map.init();

    // Create map sprite
    this.mapView = new this.PIXI.Sprite(this.map.view);
    this.mapView.anchor.x = 0;
    this.mapView.anchor.y = 0;
    this.mapView.position.x = 0;
    this.mapView.position.y = 0;

    this.stage.addChild(this.mapView);

    this.update();
}
util.inherits(SceneMap, SceneBase);

SceneMap.prototype.update = function() {
    this.map.update();
    this.mapView.setTexture(this.map.view);
};

module.exports = SceneMap;