function MixinBase() {
    this.fxn = [];
}

MixinBase.addTo = function(mapCtor) {
    this.fxn.forEach(function(property) {
        mapCtor.prototype[property] = this.constructor.prototype[property];
    });
};

module.exports = MixinBase;