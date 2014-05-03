function Vector(i, j) {
	this.i = i;
	this.j = j;
}

Vector.prototype.clone = function() {
    return new Vector(this.i, this.j);
};

Vector.prototype.dir = function() {
    if (this.i === 0) return 90;
    return Math.atan(this.j / this.i);
};

Vector.prototype.norm = function() {
    return Math.sqrt(Math.pow(this.i, 2) + Math.pow(this.j, 2));
};

Vector.prototype.unit = function() {
    var vec = this.clone();
    vec.div(vec.norm());
    return vec;
};

Vector.prototype.mult = function(scalar) {
	this.i = this.i * scalar;
	this.j = this.j * scalar;
};

Vector.prototype.div = function(scalar) {
	this.i = this.i / scalar;
	this.j = this.j / scalar;
};

Vector.prototype.add = function(vector) {
	this.i = this.i + vector.i;
	this.j = this.j + vector.j;
};

Vector.prototype.sub = function(vector) {
	this.i = this.i - vector.i;
	this.j = this.j - vector.j;
};

module.exports = Vector;