var MixItemEquippable = {
    meta: {
        name: 'MixItemEquippable',
        ctor: function(props) {
            this.isEquippable = true;
            this.durability = 0;

            this.statData.calcs.push(this.calcStatsEquippable.bind(this));
        }
    },
    calcStatsEquippable: function(ilvl, dist) {
        return {
            str: Math.round(ilvl * (dist.str || 0) / STAT_VALUE_STR),
            dex: Math.round(ilvl * (dist.dex || 0) / STAT_VALUE_DEX),
            wis: Math.round(ilvl * (dist.wis || 0) / STAT_VALUE_WIS),
            int: Math.round(ilvl * (dist.int || 0) / STAT_VALUE_INT)
        };
    }
};

//module.exports = MixItemIngredient;