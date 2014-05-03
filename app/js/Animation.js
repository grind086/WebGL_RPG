var Animation = function() {
    // ms each frame should be displayed
    this.frameTime = 50;

    // Array of sprites
    this.frames = [];
};

Animation.prototype.time = function() {
    return this.frameLength * this.frames.length;
};

Animation.prototype.getInstance = function(currentTime) {
    return new this.ctor(this, currentTime);
};

// AnimationInstance "subclass"
var AnimationInstance = function(Animation, currentTime) {
    this.Animation = Animation;
    this.frame = 0;
    this.nextFrameTime = currentTime + Animation.frameTime;
};

AnimationInstance.update = function(currentTime) {
    this.frame = (this.frame + 1) % this.frames.length;
    this.nextFrameTime = currentTime + Animation.frameTime;
};

Animation.prototype.ctor = AnimationInstance;

module.exports = Animation;