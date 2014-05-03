function SceneBase(PIXI, renderer, color) {
    this.PIXI = PIXI;
    this.renderer = renderer;
    this.stage = new PIXI.Stage(color);
}

SceneBase.prototype.update = function() {
};

module.exports = SceneBase;