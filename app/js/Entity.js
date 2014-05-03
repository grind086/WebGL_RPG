function Entity() {
    this.moveVector = new Vector(0, 0);
    this.faceDir = DIR_S_DEG;

    this.x = 0;
    this.y = 0;
}

Entity.prototype.pos = function() {
    return [this.x, this.y];
};

Entity.prototype.updatePosition = function(dt) {
    this.x = this.x + this.moveVector.i * dt;
    this.y = this.y + this.moveVector.j * dt;
};