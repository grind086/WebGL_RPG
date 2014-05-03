var SceneMap = require('./SceneMap');

module.exports = function(PIXI, renderer) {
    return {
        map: new SceneMap(PIXI, renderer)
    };
};