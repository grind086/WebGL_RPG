/**
 * Allows for simple inheritance. Based on google's closure library at
 * http://docs.closure-library.googlecode.com/git/closure_goog_base.js.source.html
 * @param {Function} childCtor Child class constructor
 * @param {Function} parentCtor Parent class constructor
 */
exports.inherits = function(childCtor, parentCtor) {
    // Create a dummy class so we aren't instantiating anything important
    function TempCtor() {}
    // Give the dummy class the prototype of the parent
    TempCtor.prototype = parentCtor.prototype;
    // Instantiate the prototype
    childCtor.prototype = new TempCtor();
    // Set the constructor back to childCtor (would have been parentCtor)
    childCtor.prototype.constructor = childCtor;
    // Provide access to the parent class constructor
    childCtor.prototype.__Super = parentCtor.prototype.constructor;
    childCtor.prototype.__super = parentCtor.prototype;
};

exports.hideScreen = function(id) {
    window.document.getElementById(id).setAttribute('active', 'false');
};

exports.showScreen = function(id) {
    window.document.getElementById(id).setAttribute('active', 'true');
};

exports.bound = function(val, min, max) {
    return Math.min(Math.max(val, min), max);
};