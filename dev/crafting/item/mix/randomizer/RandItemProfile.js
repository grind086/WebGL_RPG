function RandItemProfile() {
    this.prefixes = [];
    this.suffixes = [];

    var args = arguments[0] instanceof Array
        ? arguments[0]
        : Array.prototype.slice.call(arguments);

    for (var i = 0; i < args.length; i++) {
        if (args[i] instanceof this.constructor) {
            this.prefixes = this.prefixes.concat(args[i].prefixes);
            this.suffixes = this.suffixes.concat(args[i].suffixes);
        } else {
            // Ignore everything with an invalid type
            if (args[i].type == RANDITEM_TYPE_PREFIX)
                this.prefixes.push(args[i]);
            else if (args[i].type == RANDITEM_TYPE_SUFFIX)
                this.suffixes.push(args[i]);
        }
    }
}

RandItemProfile.fromObject = function(obj) {
    var types = [];

    for (var prefix in obj.prefixes) {
        if (obj.prefixes.hasOwnProperty(prefix)) {
            types.push(obj.prefixes[prefix]);
        }
    }
    for (var suffix in obj.suffixes) {
        if (obj.suffixes.hasOwnProperty(suffix)) {
            types.push(obj.suffixes[suffix]);
        }
    }

    return new RandItemProfile(types);
};

RandItemProfile.prototype.choose = function() {
    return {
        prefix: this.prefixes[Math.floor(Math.random()*this.prefixes.length)] || {text:""},
        suffix: this.suffixes[Math.floor(Math.random()*this.suffixes.length)] || {text:""}
    };
};