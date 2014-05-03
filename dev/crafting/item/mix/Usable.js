var MixItemUsable = {
    meta: {
        name: 'MixItemUsable',
        ctor: function(props) {
            this.isUsable = true;

            this.useGroup = props.useGroup || null;
            this.useCooldown = props.useCooldown || null;

            // This needs to be kept track of on a per-entity basis
            this.lastUsed = null;
        }
    },
    isCDFinished: function() {
        return this.lastUsed === null || this.useCooldown == null ||
            new Date().getTime() > this.lastUsed + this.useCooldown * 1000;
    },
    canUse: function() {
        if (!this.isCDFinished()) return false;
        return true;
    },
    use: function() {
        console.log('Using ' + this.name);

        var wasUsed = this.canUse() ? this.useItem() : false;
        if (wasUsed) {
            this.lastUsed = new Date().getTime();
        }

        return wasUsed || false;
    },

    /* Abstract */
    useItem: function() { return false; }
};

//module.exports = MixItemUsable;