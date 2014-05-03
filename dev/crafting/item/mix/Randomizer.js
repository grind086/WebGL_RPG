// var RandItemProfile = require('randomizer/RandItemProfile');
// var RandItemType = require('randomizer/RandItemType');

var MixItemRandomizer = {
    meta: {
        name: 'MixItemRandomizer',
        ctor: function(props) {
            this.randomItemInit = false;

            this.data_.randomizer = {
                // Stat boosts are prefixes
                // Stat distributions are suffixes
                profile: null,
                odds: {
                    both: 1.01,
                    pre: 0.03,
                    suf: 0.05
                },
                canReroll: false,
                baseName: this.name,
                mode: undefined
            };

            if (props.randomizer) {
                this.data_.randomizer.profile = this.data_.randomizer.profile || props.randomizer.profile;
                this.data_.randomizer.odds = this.data_.randomizer.odds || props.randomizer.odds;
            }
        },
        init: function() {
            var randomizerState = this.data_.randomizer;
            this.__defineGetter__("randomizerState", function() {
                if (!randomizerState.canReroll || !this.randomItemInit)
                    return undefined;
                return randomizerState;
            });

            this.generateRandomItem();
        }
    },

    generateRandomItem: function() {
        if (this.randomItemInit) return;
        this.randomItemInit = true;

        var r = this.data_.randomizer;

        // Determine stat mode
        var moder = Math.random();
        var mode;
        if ((moder -= r.odds.both) < 0) mode = 0;
        else if ((moder -= r.odds.pre) < 0) mode = 1;
        else if ((moder -= r.odds.suf) < 0) mode = 2;
        else mode = 3;

        // Set mode
        this.data_.randomizer.mode = mode;

        // Set item quality
        if (mode == 0)
            this.quality = QUALITY_RARE;
        else if (mode == 1 || mode == 2)
            this.quality = QUALITY_UNCOMMON;
        else if (mode == 3) {
            this.quality = QUALITY_COMMON;
            // Common items have no stats, and don't need to be rerolled
            this.data_.randomizer.canReroll = false;
        }

        // Roll stats
        this.rollItem();
    },

    rollItem: function() {
        var r = (this.hasOwnProperty('data_') && this.data_.randomizer) ? this.data_.randomizer : this.randomizerState;
        if (!r.profile) {
            console.error('No randomizer profile loaded for Item:' + this.id + ':' + this.uid);
            return false;
        }
        var mode = r.mode;
        var stats = r.profile.choose();

        // Apply changes
        var name = [r.baseName];

        if (mode === 0 ||mode === 2) {
            name.push(stats.suffix.text);
            stats.suffix.commit(this);
        }
        if (mode === 0 ||mode === 1) {
            name.unshift(stats.prefix.text);
            stats.prefix.commit(this);
        }

        this.name = name.join(' ').trim();
        return true;
    }
};

//module.exports = MixItemRandomizer;